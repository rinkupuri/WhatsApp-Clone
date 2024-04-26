import { apiSlice } from "../Slice/ApiSlice";
import { setUser } from "../userReducer/reducer";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (text: string) => `/users/${text}`,
    }),
    me: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

export const { useGetUserQuery } = userApi;
