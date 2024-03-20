import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./slice/querySlice";
import dialogReducer from "./slice/dialogSlice";
import userReducer from "./slice/user/userSlice";
import orderReducer from "./slice/order/orderSlice";
import orderManagerReducer from "./slice/manager/order/orderSlice";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    query: queryReducer,
    user: userReducer,
    order: orderReducer,
    orderManager: orderManagerReducer,
  },
  devTools: true, // Enable Redux DevTools extension
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

