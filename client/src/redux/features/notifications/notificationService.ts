import axios from "axios";
import { BACKEND_URL } from "../auth/authService";
import toast from "react-hot-toast";

const API_URL = BACKEND_URL + "/notification";

export const getNotifications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
