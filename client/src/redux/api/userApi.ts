import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { IUser } from "./types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, null>({
      query() {
        return {
          url: "getUser",
          credentials: "include",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});
