import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { payloadCreator } from "../../../utils/utils";
import { chatService } from "../../../services/chat.service";

export const getChatUsers = createAsyncThunk(
  "chat/getChatUsers",
  payloadCreator(chatService.getChatUsers),
);

const initialState = {
  statistic: {
    // Tổng thu nhập của ngày/tuần/tháng/năm này
    totalOrderReceived: {
      today: 25,
      week: 100,
      month: 500,
      year: 500,
    },
    // Tổng thu nhập của ngày/tuần/tháng/năm này
    totalOrderDelivered: {
      today: 25,
      week: 100,
      month: 500,
      year: 500,
    },
    // Tổng thu nhập của ngày/tuần/tháng/năm này
    totalIncome: {
      today: 250000,
      week: 1000000,
      month: 5000000,
      year: 500,
    },
    // Thu nhập từng tháng trong năm
    income12Month: [
      { name: 2022, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 22] },
      { name: 2023, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 22] },
      { name: 2024, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 22] },
    ],
  },
};

export const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

const statisticReducer = statisticSlice.reducer;
export default statisticReducer;

