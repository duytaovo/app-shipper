import httpRequest from "../utils/httpRequest";

export const chatService = {
  getChatUserById(id: number) {
    return httpRequest.get(`/user/chat-user/${id}`);
  },
  getChatUsers() {
    return httpRequest.get(`/user/chat-user`);
  },
};

