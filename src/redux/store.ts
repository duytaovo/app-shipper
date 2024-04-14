import queryReducer from "./slice/querySlice";
import dialogReducer from "./slice/dialogSlice";
import userReducer from "./slice/user/userSlice";
import orderReducer from "./slice/order/orderSlice";
import orderManagerReducer from "./slice/manager/order/orderSlice";
import manageShipperReducer from "./slice/managerShipper/orderSlice";
import chatReducer from "./slice/chat/chat";
import {
  AnyAction,
  Store,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import statisticReducer from "./slice/statistic/statisticSlice";
export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    query: queryReducer,
    user: userReducer,
    order: orderReducer,
    orderManager: orderManagerReducer,
    manageShipper: manageShipperReducer,
    chatShipper: chatReducer,
    statistic: statisticReducer,
  },
  devTools: true, // Enable Redux DevTools extension
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

