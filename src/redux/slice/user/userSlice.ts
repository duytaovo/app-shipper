import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../../services/auth.service";
import { payloadCreator } from "../../../utils/common";
import { userService } from "../../../services/user.service";

export const login = createAsyncThunk(
  "auth/login",
  payloadCreator(authApi.login),
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  payloadCreator(authApi.register),
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  payloadCreator(authApi.logout),
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  payloadCreator(authApi.getUser),
);

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  payloadCreator(userService.getUserById),
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  payloadCreator(userService.forgotPassword),
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  payloadCreator(userService.updateProfile),
);

export const updatePasswordUser = createAsyncThunk(
  "auth/updatePasswordUser",
  payloadCreator(userService.updatePasswordUser),
);

export const activeAccount = createAsyncThunk(
  "auth/activeAccount",
  payloadCreator(userService.activeAccount),
);

export const getCodeValidator = createAsyncThunk(
  "auth/getCodeValidator",
  payloadCreator(userService.sendCode),
);

const initialState = {
  name: "admin",
  accessToken: "123",
  token: "",
  user: [],
  permission: -1,
  isActiveEdit: true,
  profile: {
    id: 1,
    address: "",
    email: "",
    fullName: "",
    gender: 0,
    imageUrl: "",
    level: 1,
    phoneNumber: "",
    isEnable: false,
  },

  userWithId: {
    id: 1,
    fullName: "",
    phoneNumber: "",
    password: "",
    email: "",
    gender: 1,
    address: "",
    imageUrl: "",
  },
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleActiveEdit: (state) => {
      state.isActiveEdit = !state.isActiveEdit;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(login.fulfilled, (state, { payload }) => {
    //   state.accessToken = payload?.data?.data?.accessToken;
    //   state.token = payload?.data?.data?.token;
    // });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.profile = payload.data.data;
    });

    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.userWithId = payload.data.data;
    });
  },
});
export const { toggleActiveEdit } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;

