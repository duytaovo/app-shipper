import { SuccessResponse } from "../types/utils.type";
import http from "../utils/httpRequest";

const URL = "/shipper";

export const unorderService = {
  putUnOrderRequest({ orderId }: any) {
    return http.put(`${URL}/order/mistake/update/${orderId}`);
  },
  putReturned({ orderId }: any) {
    return http.put(`${URL}/returned?orderId=${orderId}`);
  },
  putReceiveChangeDeliveri({ orderId }: any) {
    return http.put(`${URL}/receive-change-delivering?orderId=${orderId}`);
  },
  putFailDelivery({ orderId }: any) {
    return http.put(`${URL}/delivery-fail?orderId=${orderId}`);
  },
  putChangeDelivering({ orderId, shipperId }: any) {
    return http.put(
      `${URL}/change-delivering?orderId=${orderId}&shipperId=${shipperId}`,
    );
  },
  getUnOrders({ body, params }: any) {
    return http.post<SuccessResponse<any[]>>(`${URL}/order/mistake`, body, {
      params,
    });
  },
  getShipperForShiper({ body }: any) {
    return http.get<SuccessResponse<any[]>>(`${URL}`, body);
  },
};

