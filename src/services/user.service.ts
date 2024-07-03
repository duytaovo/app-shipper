import httpRequest from "../utils/httpRequest";

interface BodyUpdatePassword {
  phoneNumber: string;
  newPassword: string;
  validatorCode: string;
}

export const userService = {
  getUserById(id: number) {
    if (id) {
      return httpRequest.get(`/user/profile/${id}`);
    } else {
      return;
    }
  },

  updateProfile({ id, body }: any) {
    return httpRequest.put(`/user/update-profile/${id}`, body);
  },
  updatePasswordUser(body: any) {
    //console.log(body);
    return httpRequest.put(`/user/change-password`, body);
  },
  activeAccount(data: any) {
    return httpRequest.put("/user/active-account", data);
  },
  forgotPassword(body: BodyUpdatePassword) {
    return httpRequest.put(`/user/forgot-password`, body);
  },
  sendCode(data: any) {
    return httpRequest.post("/user/send-code", data);
  },
  uploadAvatar(body: FormData) {
    return httpRequest.post("user/upload-avatar", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

