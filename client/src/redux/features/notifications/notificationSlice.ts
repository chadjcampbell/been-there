import { createSlice } from "@reduxjs/toolkit";

export type NotificationType = {
  notification_id: number;
  user_id: number;
  type: string;
  content: string;
  is_read: boolean;
  created_at: Date;
};

const initialState = {
  notifications: [] as NotificationType[],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    SET_NOTIFICATIONS(state, action) {
      state.notifications = action.payload;
    },
    ADD_NOTIFICATION(state, action) {
      const notificationExists = state.notifications.findIndex(
        (n) => n.content == action.payload.content
      );
      if (notificationExists === -1) {
        state.notifications.unshift(action.payload);
      } else {
        state.notifications.splice(notificationExists, 1);
        state.notifications.unshift(action.payload);
      }
    },
  },
});

export const { SET_NOTIFICATIONS, ADD_NOTIFICATION } =
  notificationSlice.actions;

export const selectNotifications = (state: any) =>
  state.notifications.notifications;

export default notificationSlice.reducer;
