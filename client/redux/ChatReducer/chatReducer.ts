import { createSlice } from "@reduxjs/toolkit";

export const chatApi = createSlice({
  name: "chatApi",
  initialState: {
    chat: {
      id: "",
      users: [""],
      lastmessage: { message: "", date: "" },
      isDeleted: false,
      isRead: true,
      unread: 0,
      chatId: "",
      user: {
        id: "",
        name: "",
        email: "",
        avatar: "",
        status: "",
      },
    },
  },
  reducers: {
    setChat(state, action) {
      console.log(action.payload.chat);
      state.chat = action.payload.chat;
    },
    removeChat(state) {
      state.chat = {
        id: "",
        users: [""],
        lastmessage: { message: "", date: "" },
        isDeleted: false,
        isRead: true,
        unread: 0,
        chatId: "",
        user: {
          id: "",
          name: "",
          email: "",
          avatar: "",
          status: "",
        },
      };
    },
  },
});
export const { setChat, removeChat } = chatApi.actions;
