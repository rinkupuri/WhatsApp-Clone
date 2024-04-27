import { apiSlice } from "../Slice/ApiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({
        url: "/chat/get",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});
export const { useGetChatsQuery } = chatApi;
