import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("name");

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    id: "",
    name: "",
    email: "",
    photo: "",
    bio: "",
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
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.bio = action.payload.bio;
      state.user.photo = action.payload.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectName = (state: any) => state.auth.name;
export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;
