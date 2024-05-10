import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slice/ApiSlice";
import { chatApi } from "./ChatReducer/chatReducer";
import auth from "./userReducer/reducer";
import { userApi } from "./Apis/users.api";

export type RootState = ReturnType<typeof Store.getState>;

export const Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: auth,
    chat: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
