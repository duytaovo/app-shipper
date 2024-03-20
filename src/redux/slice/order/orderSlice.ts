import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../../../utils/utils";
import { orderService } from "../../../services/shipper-order.service";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  payloadCreator(orderService.getOrders),
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  payloadCreator(orderService.getOrderById),
);

export const putOrderDelivered = createAsyncThunk(
  "orders/putOrderDelivered",
  payloadCreator(orderService.putOrderDelivery),
);

export const putOrderReceive = createAsyncThunk(
  "orders/putOrderReceive",
  payloadCreator(orderService.putOrderReceive),
);

export const putOrderReject = createAsyncThunk(
  "orders/putOrderReject",
  payloadCreator(orderService.putOrderReject),
);

export const putOrderRequest = createAsyncThunk(
  "orders/putOrderRequest",
  payloadCreator(orderService.putOrderRequest),
);

interface Data {
  code: number;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    data: {
      id: number;
      nameReceiver: string;
      phoneReceiver: string;
      addressReceiver: string;
      message: string;
      orderPrice: number;
      deliveryPrice: number;
      discount: number;
      finalPrice: number;
      orderStatus: number;
      orderStatusString: string;
      buyDate: string;
      paymentStatus: number;
      paymentStatusString: string;
      paymentMethod: string;
      userId: number;
      orderDetails: {
        slug: string;
        productId: number;
        orderProductId: number;
        feedbackId: null;
        name: string;
        image: string;
        quantity: number;
        typeId: number;
        ram: string;
        storageCapacity: string;
        color: string;
        price: number;
        salePrice: number;
      }[];
    }[];
  };
}

interface DetailOrder {
  id: number;
  nameReceiver: string;
  phoneReceiver: string;
  addressReceiver: string;
  message: string;
  orderPrice: number;
  deliveryPrice: number;
  discount: number;
  finalPrice: number;
  orderStatus: number;
  orderStatusString: string;
  buyDate: string;
  paymentStatus: number;
  paymentStatusString: string;
  paymentMethod: string;
  userId: number;
  orderDetails: {
    id: number;
    slug: string;
    productId: number;
    orderProductId: number;
    feedbackId: number;
    name: string;
    image: string;
    quantity: number;
    typeId: number;
    ram: string;
    storageCapacity: string;
    color: string;
    price: number;
    salePrice: number;
  }[];
}

const dataDetailMau: DetailOrder = {
  id: 0,
  nameReceiver: "",
  phoneReceiver: "",
  addressReceiver: "",
  message: "",
  orderPrice: 0,
  deliveryPrice: 0,
  discount: 0,
  finalPrice: 0,
  orderStatus: 0,
  orderStatusString: "",
  buyDate: "",
  paymentStatus: 0,
  paymentStatusString: "",
  paymentMethod: "",
  userId: 0,
  orderDetails: [],
};

const datamau: Data = {
  code: 0,
  message: "",
  data: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0,
    data: [],
  },
};

const initialState = {
  orderAll: datamau,
  orderDetail: dataDetailMau,
};

export const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      console.log(payload.data);
      state.orderAll = payload.data;
    });
    builder.addCase(getOrderById.fulfilled, (state, { payload }) => {
      state.orderDetail = payload.data.data;
    });
  },
});

const orderReducer = orders.reducer;
export default orderReducer;

