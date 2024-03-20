import axios, { AxiosError, type AxiosInstance } from "axios";
import { getTokenFromStore, saveTokenToStore } from "./storage";

export const URL_LOGIN = "/authenticate";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "/refreshToken";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshTokenRequest: Promise<string> | null;
  constructor(url: string) {
    let _accessToken: any = "";
    getTokenFromStore("accessToken").then((res) => (_accessToken = res));
    this.accessToken = _accessToken;
    this.refreshTokenRequest = null;
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
          saveTokenToStore("accessToken", this.accessToken);
        } else if (url === URL_LOGOUT) {
        }
        // (response);
        return response;
      },
      (error: AxiosError) => {},
    );
  }
}
const http = new Http("http://localhost:8081/api").instance;
export default http;

