import { apiSlice } from "../Slice/ApiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (body: {
        chatId: string;
        receiverId: string;
        message: string;
      }) => ({
        url: `/message/create`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    getMessages: builder.query({
      query: ({ chatId }: { chatId: string }) => ({
        url: `/message/get/${chatId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateAsRead: builder.mutation({
      query: (chatId: string) => ({
        url: `/message/read/${chatId}`,
        method: "Put",
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useUpdateAsReadMutation,
} = messageApi;