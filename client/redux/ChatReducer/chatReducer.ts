import { createSlice } from "@reduxjs/toolkit";

export const chatApi = createSlice({
  name: "chatApi",
  initialState: {
    chat: {
      id: "",
      users: [""],
      lastmessage: { message: "", date: new Date() },
      isDeleted: false,
      isRead: true,
      unread: 0,
      chatId: "",
      user: {
        name: "",
        email: "",
        avatar: "",
      },
    },
  },
  reducers: {
    setChat(state, action) {
      console.log(action.payload.chat);
      state.chat = action.payload.chat;
    },
  },
});
export const { setChat } = chatApi.actions;
