import httpRequest from "../utils/httpRequest";

export const shipperManagerService = {
  getShippers() {
    return httpRequest.get(`/manage/shipper`);
  },
  putChangeDelivering({ orderId, shipperId }: any) {
    return httpRequest.put(
      `/manage/shipper/change-delivering?orderId=${orderId}&shipperId=${shipperId}`,
    );
  },
};

