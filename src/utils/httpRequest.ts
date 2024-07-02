import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import {
  getTokenFromStore,
  removeTokenFromStore,
  saveTokenToStore,
} from "./storage";
import { Toast } from "native-base";
import { isAxiosUnauthorizedError } from "./utils";
import { ErrorResponse } from "../types/utils.type";

export const URL_LOGIN = "/authenticate";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "/refreshToken";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private token: Promise<string> | null;
  constructor(url: string) {
    let _accessToken: any = "";
    let _token: any = "";
    getTokenFromStore("accessToken").then((res) => (_accessToken = res));
    getTokenFromStore("token").then((res) => (_token = res));
    this.accessToken = _accessToken;
    this.refreshToken = _token;
    this.token = null;
    this.instance = axios.create({
      baseURL: url,
      // timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        // "expire-access-token": 60 * 60 * 24, // 1 ngày
        // "expire-refresh-token": 60 * 60 * 24 * 160, // 160 ngày
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN) {
          const data = response.data;
          this.accessToken = data.data.accessToken;
          this.refreshToken = data.data.token;
          saveTokenToStore("accessToken", this.accessToken);
          saveTokenToStore("token", this.refreshToken);
        } else if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          removeTokenFromStore("accessToken");
          removeTokenFromStore("token");
        }
        // (response);
        return response;
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
            HttpStatusCode.Forbidden,
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          Toast.show(message);
        }
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          const config: any = error.response?.config || {};
          const { url } = config;

          if (
            url !== URL_REFRESH_TOKEN &&
            error.response?.status == HttpStatusCode.Forbidden
          ) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.accessToken = "";
            this.token = this.token
              ? this.token
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.token = null;
                  }, 10000);
                });
            return this.token.then((accessToken) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: accessToken },
              });
            });
          }

          // clearLS();
          // this.accessToken = "";
          // this.refreshToken = "";
          // Toast.show(
          //   error.response?.data.data?.message ||
          //     error.response?.data.message ||
          //     "",
          // );

          // window.location.reload();
        }
        return Promise.reject(error);
      },
    );
  }
  private handleRefreshToken() {
    return this.instance
      .post<any>(URL_REFRESH_TOKEN, {
        token: this.refreshToken,
      })
      .then((res) => {
        const { accessToken } = res.data.data;
        saveTokenToStore("accessToken", accessToken);
        this.accessToken = accessToken;
        return accessToken;
      })
      .catch((error) => {
        removeTokenFromStore("accessToken");
        this.accessToken = "";
        this.refreshToken = "";
        throw error;
      });
  }
}
const http = new Http("http://localhost:8081/api").instance;
export default http;

