import httpRequest from "../utils/httpRequest";

export const shipperManagerService = {
  getShippers() {
    return httpRequest.get(`/manage/shipper`);
  },
};

