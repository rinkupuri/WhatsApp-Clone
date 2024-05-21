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
      }),
      transformResponse: (response: any) => response,
    }),

    deleteChat: builder.mutation({
      query: (id: string) => ({
        url: `/chat/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
} = chatApi;
