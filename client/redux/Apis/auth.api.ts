import { apiSlice } from "../Slice/ApiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    register: builder.mutation({
      query: (data: { name: string; email: string; password: string }) => ({
        url: "/users/create",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
