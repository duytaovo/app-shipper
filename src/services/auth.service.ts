import httpRequest from "../utils/httpRequest";

export const authApi = {
  login(data: any) {
    return httpRequest.post("/authenticate", data);
  },
  register(data: any) {
    return httpRequest.post("/user/sign-up-shipper", data);
  },
  logout() {
    return httpRequest.post("/logout", {});
  },
  getUser() {
    return httpRequest.get(`/authenticate/user`);
  },
};

