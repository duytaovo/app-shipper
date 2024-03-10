import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slice/cartSlice";
import queryReducer from "./slice/querySlice";
import dialogReducer from "./slice/dialogSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    dialog: dialogReducer,
    query: queryReducer,
  },
  devTools: true, // Enable Redux DevTools extension
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
