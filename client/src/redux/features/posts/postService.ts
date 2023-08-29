import axios from "axios";
import { BACKEND_URL } from "../auth/authService";
import toast from "react-hot-toast";

const API_URL = BACKEND_URL + "/posts/";

export const findAllPosts = async () => {
  try {
    const response = await axios.get(API_URL + "findAllPosts");
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export type PostFormData = {
  content: string;
  postPhotoUrl?: string;
};

export const makeNewPost = async (formData: PostFormData) => {
  try {
    const response = await axios.post(API_URL + "makePost", formData);
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
      return response.data.post;
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export type PostIdFormData = {
  postId: number;
};

export const likePost = async (formData: PostIdFormData) => {
  try {
    const response = await axios.post(API_URL + "likePost", formData);
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const deletePost = async (formData: PostIdFormData) => {
  try {
    const response = await axios.delete(API_URL + "deletePost", {
      data: formData,
    });
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
