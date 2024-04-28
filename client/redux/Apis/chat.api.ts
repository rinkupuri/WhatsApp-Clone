import { apiSlice } from "../Slice/ApiSlice";
interface LastMessage {
  message: string;
}

interface chatCreateType {
  users: string[];
  lastmessage: LastMessage;
}

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ data }: { data: chatCreateType }) => ({
        url: "/chat/create",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    getChats: builder.query({
      query: () => ({
        url: "/chat/get",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});
export const { useGetChatsQuery, useCreateChatMutation } = chatApi;
