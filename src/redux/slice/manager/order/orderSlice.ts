import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderManagerService } from "../../../../services/manage-order.service";
import { payloadCreator } from "../../../../utils/common";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  payloadCreator(orderManagerService.getPurchases),
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  payloadCreator(orderManagerService.getPurchaseById),
);

export const putOrderSuccess = createAsyncThunk(
  "orders/putOrderSuccess",
  payloadCreator(orderManagerService.putOrderSuccess),
);

export const putOrderDelivery = createAsyncThunk(
  "orders/putOrderDelivery",
  payloadCreator(orderManagerService.putOrderDelivery),
);

export const putOrderConfirm = createAsyncThunk(
  "orders/putOrderConfirm",
  payloadCreator(orderManagerService.putOrderConfirm),
);

export const putOrderAssign = createAsyncThunk(
  "orders/putOrderAssign",
  payloadCreator(orderManagerService.putOrderAssign),
);

export const putOrderApprove = createAsyncThunk(
  "orders/putOrderApprove",
  payloadCreator(orderManagerService.putOrderApprove),
);

export const putOrderReject = createAsyncThunk(
  "orders/putOrderReject",
  payloadCreator(orderManagerService.putOrderReject),
);

export const putOrderReceive = createAsyncThunk(
  "orders/putOrderReceive",
  payloadCreator(orderManagerService.putOrderReceive),
);

export const putOrderCancel = createAsyncThunk(
  "orders/putOrderCancel",
  payloadCreator(orderManagerService.putOrderCancel),
);
const datamau = {
  code: 0,
  message: "",
  data: {
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 2,
    data: [],
  },
};
const initialState = {
  order: datamau,
  orderDetail: {},
};

export const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.order = payload.data;
    });
    builder.addCase(getOrderById.fulfilled, (state, { payload }) => {
      state.orderDetail = payload.data.data;
    });
  },
});

const orderManagerReducer = orders.reducer;
export default orderManagerReducer;

