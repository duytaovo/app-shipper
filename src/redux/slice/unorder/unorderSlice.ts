import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../../../utils/utils";
import { orderService } from "../../../services/shipper-order.service";
import { unorderService } from "../../../services/shipper-unorder.service";

export const getUnOrders = createAsyncThunk(
  "unorders/getOrders",
  payloadCreator(unorderService.getUnOrders),
);

export const putUnOrderApproved = createAsyncThunk(
  "unorders/putUnOrderApproved",
  payloadCreator(unorderService.putUnOrderRequest),
);

export const putReturned = createAsyncThunk(
  "unorders/putReturned",
  payloadCreator(unorderService.putReturned),
);

export const putReturneChangeToCustom = createAsyncThunk(
  "unorders/putReturneChangeToCustom",
  payloadCreator(unorderService.putReturnChangeToCustom),
);

export const putReceiveChangeDelivering = createAsyncThunk(
  "unorders/putReceiveChangeDeliveri",
  payloadCreator(unorderService.putReceiveChangeDeliveri),
);

export const putFailDelivery = createAsyncThunk(
  "unorders/putFailDelivery",
  payloadCreator(unorderService.putFailDelivery),
);

export const putChangeDelivering = createAsyncThunk(
  "unorders/putChangeDelivering",
  payloadCreator(unorderService.putChangeDelivering),
);

export const getShipperForShipper = createAsyncThunk(
  "unorders/getShipperForShipper",
  payloadCreator(unorderService.getShipperForShiper),
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
      content: [];
    };
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
    data: {
      content: [],
    },
  },
};

const initialState = {
  unorderAll: datamau,
  orderDetail: dataDetailMau,
  shipperForShipper: {
    code: 200,
    message: "Requested completed!",
    data: {
      pageNumber: 0,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
      data: [
        {
          id: 1,
          fullName: "",
          phoneNumber: "",
          email: "",
          gender: 1,
          address: "",
          imageUrl: "",
          level: 1,
          levelString: "Bronze",
          isEnable: true,
        },
      ],
    },
  },
};

export const unorders = createSlice({
  name: "unorders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnOrders.fulfilled, (state, { payload }) => {
      state.unorderAll = payload.data;
    });
    builder.addCase(getShipperForShipper.fulfilled, (state, { payload }) => {
      state.shipperForShipper = payload.data;
    });
  },
});

const unorderReducer = unorders.reducer;
export default unorderReducer;

