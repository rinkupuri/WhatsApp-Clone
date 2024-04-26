import { createSlice } from "@reduxjs/toolkit";

export const chatApi = createSlice({
  name: "chatApi",
  initialState: {
    chat: null,
  },
  reducers: {
    setChat(state, action) {
      state.chat = action.payload;
    },
  },
});
export const { setChat } = chatApi.actions;
