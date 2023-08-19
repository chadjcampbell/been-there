import axios from "axios";
import { BACKEND_URL } from "../auth/authService";
import toast from "react-hot-toast";

const API_URL = BACKEND_URL + "/friends/";

export const findNewFriend = async (friendName: string) => {
  try {
    const response = await axios.get(API_URL + "findNewFriend/" + friendName);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const sendFriendRequest = async (friendId: number) => {
  try {
    const response = await axios.post(API_URL + "sendFriendRequest", friendId);
    if (response.statusText == "OK") {
      toast.success("Friend request sent");
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getPendingFriends = async () => {
  try {
    const response = await axios.get(API_URL + "pendingFriends/");
    console.log(response);
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};