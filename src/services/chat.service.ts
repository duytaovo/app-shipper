import { SuccessResponse } from "../types/utils.type";
import httpRequest from "../utils/httpRequest";

export const chatService = {
  getChatUserById(id: number) {
    return httpRequest.get(`/user/chat-user/${id}`);
  },
  getChatUsers() {
    return httpRequest.get(`/user/chat-user`);
  },
  uploadImage(body: any) {
    console.log("object" + JSON.stringify(body));
    return httpRequest.post<SuccessResponse<string>>(
      "/file/system/upload",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: () => {
          return body;
        },
      },
    );
  },
  uploadManyImages(body: any) {
    return httpRequest.post<SuccessResponse<string>>("/file/s3/upload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

