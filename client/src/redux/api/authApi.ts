import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormLoginInputs } from "../../routes/Login";
import { IFormRegisterInputs } from "../../routes/Register";
import { IGenericResponse } from "./types";
import { userApi } from "./userApi";

const BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, IFormRegisterInputs>({
      query(data) {
        return {
          url: "register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      IFormLoginInputs
    >({
      query(data) {
        return {
          url: "login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;
