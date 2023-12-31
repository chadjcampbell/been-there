import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import friendsReducer from "../redux/features/friends/friendsSlice";
import chatsReducer from "../redux/features/chats/chatSlice";
import postsReducer from "../redux/features/posts/postSlice";
import notificationReducer from "../redux/features/notifications/notificationSlice";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
    posts: postsReducer,
    chats: chatsReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
