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
    return http.put(`${URL}/receive?orderId=${orderId}`);
  },
  putOrderReject({ orderId }: any) {
    return http.put(`${URL}/reject?orderId=${orderId}`);
  },
  putOrderRequest({ orderId }: any) {
    return http.put(`${URL}/request?orderId=${orderId}`);
  },
};

