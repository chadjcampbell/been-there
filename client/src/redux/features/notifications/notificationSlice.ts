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
      state.notifications.push(action.payload);
    },
  },
});

export const { SET_NOTIFICATIONS, ADD_NOTIFICATION } =
  notificationSlice.actions;

export const selectNotifications = (state: any) =>
  state.notification.notifications;

export default notificationSlice.reducer;
