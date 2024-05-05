import { SuccessResponse } from "../types/utils.type";
import http from "../utils/httpRequest";

const URL = "/shipper";

export const orderService = {
  getOrders({ body, params }: any) {
    return http.post<SuccessResponse<any[]>>(`${URL}/order`, body, {
      params,
    });
  },
  getOrderById(id: any) {
    return http.get<SuccessResponse<any[]>>(`${URL}/order/${id}`);
  },
  putOrderDelivery({ orderId }: any) {
    return http.put(`${URL}/delivery?orderId=${orderId}`);
  },
  putOrderReceive({ orderId }: any) {
    console.log(orderId);
    return http.put(`${URL}/receive?orderId=${orderId}`);
  },
  putOrderReject({ orderId, reason }: any) {
    return http.put(`${URL}/reject?orderId=${orderId}&reason=${reason}`);
  },
  putOrderRequest({ orderId }: any) {
    return http.put(`${URL}/request?orderId=${orderId}`);
  },
};

