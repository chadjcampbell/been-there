import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("name");

export type UserType = {
  userId: number;
  name: string;
  email: string;
  photoUrl: string;
  bio: string;
  registrationDate: Date;
};

const initialState = {
  isLoggedIn: null,
  name: name ? name : "",
  user: {
    userId: "",
    name: "",
    email: "",
    photoUrl: "",
    bio: "",
    registrationDate: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      state.user = action.payload;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectName = (state: any) => state.auth.name;
export const selectUser = (state: any) => state.auth.user as UserType;

export default authSlice.reducer;
