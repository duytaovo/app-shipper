import { SuccessResponse } from "../types/utils.type";
import http from "../utils/httpRequest";

const URL = "/manage/order/unOrder";

export const unOrderApi = {
  getPurchases({ body, params }: any) {
    return http.post<SuccessResponse<any[]>>(`${URL}`, body, {
      params,
    });
  },
  getPurchaseById(id: any) {
    return http.get<SuccessResponse<any[]>>(`${URL}/${id}`);
  },
  putOrderSuccess(id: any) {
    return http.put(`${URL}/success/${id}`);
  },
  putOrderDelivery(id: any) {
    return http.put(`${URL}/delivery/${id}`);
  },
  putOrderConfirm(id: any) {
    return http.put(`${URL}/confirm/${id}`);
  },
  putOrderCancel(id: any) {
    return http.put(`${URL}/cancel/${id}`);
  },
  putUnOrderApprove({ id, shipperId }: any) {
    return http.put(`${URL}/approve/${id}?shipperId=${shipperId}`);
  },
  putOrderAssign({ id, shipperId }: { id: number; shipperId: number }) {
    return http.put(`${URL}/assign/${id}?shipperId=${shipperId}`);
  },
  putOrderReceive(id: any) {
    return http.put(`${URL}/receive/${id}`);
  },
  putOrderReject(id: any) {
    return http.put(`${URL}/reject/${id}`);
  },
};

