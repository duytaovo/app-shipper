import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "../../../utils/utils";
import { shipperManagerService } from "../../../services/manage-shipper.service";

export const getShippers = createAsyncThunk(
  "manageShipper/getShippers",
  payloadCreator(shipperManagerService.getShippers),
);

const initialState = {
  shippers: {
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

export const manageShipper = createSlice({
  name: "manageShipper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShippers.fulfilled, (state, { payload }) => {
      state.shippers = payload.data;
    });
  },
});

const manageShipperReducer = manageShipper.reducer;
export default manageShipperReducer;

