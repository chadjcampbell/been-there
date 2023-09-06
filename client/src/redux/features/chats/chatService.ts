import axios from "axios";
import { BACKEND_URL } from "../auth/authService";
import toast from "react-hot-toast";

const API_URL = BACKEND_URL + "/chats/";

export const findChat = async (friendId: number) => {
  try {
    const response = await axios.get(API_URL + friendId);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export type SendMessageData = {
  friendId: number;
  message: string;
  messagePhotoUrl?: string;
};

export const sendMessage = async (formData: SendMessageData) => {
  try {
    const response = await axios.post(API_URL, formData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
