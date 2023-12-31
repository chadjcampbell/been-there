import axios from "axios";
import { toast } from "react-hot-toast";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type UserDataType = {
  name?: String;
  email?: String;
  password?: String;
};

export type userUpdateData = {
  name: string;
  bio: string;
  photo: string;
};

export type PasswordUpdateData = {
  oldPassword: string;
  password: string;
};

export const registerUser = async (userData: UserDataType) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/auth/register",
      userData,
      {
        withCredentials: true,
      }
    );
    if (response.status >= 200 && response.status < 300) {
      toast.success("Welcome to Been There!");
      setTimeout(() => {
        toast.success("Where have you been?");
      }, 1000);
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const loginUser = async (userData: UserDataType) => {
  try {
    const response = await axios.post(BACKEND_URL + "/auth/login", userData);
    if (response.status >= 200 && response.status < 300) {
      toast.success("User Login Successful");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/auth/logout");
    if (response.status >= 200 && response.status < 300) {
      toast.success("User Logout Successful");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete(BACKEND_URL + "/auth/");
    if (response.status >= 200 && response.status < 300) {
      toast.success("User data deleted");
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const forgotPassword = async (userData: UserDataType) => {
  try {
    const response = await axios.post(
      BACKEND_URL + "/auth/forgotPassword",
      userData
    );
    if (response.statusText === "OK") {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const resetPassword = async (
  userData: UserDataType,
  resetToken: string
) => {
  try {
    const response = await axios.put(
      BACKEND_URL + "/auth/resetPassword/" + resetToken,
      userData
    );
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/auth/loggedIn/");
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/auth/getUser/");
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateUser = async (formData: userUpdateData) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + "/auth/updateUser",
      formData
    );
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const changePassword = async (formData: PasswordUpdateData) => {
  try {
    const response = await axios.patch(
      BACKEND_URL + "/auth/changePassword",
      formData
    );
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
