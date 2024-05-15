import { apiSlice } from "../Slice/ApiSlice";
import { setUser } from "../userReducer/reducer";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (text: string) => ({
        url: `/users/get/${encodeURI(text)}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include" as const,
        withCredentials: true,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include" as const,
        withCredentials: true,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (err) {}
      },
    }),
  }),
});

export const { useGetUserQuery, useMeQuery } = userApi;
