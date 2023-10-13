import axios from "axios";
import { BACKEND_URL } from "../auth/authService";
import toast from "react-hot-toast";

const API_URL = BACKEND_URL + "/posts/";

export const findAllPosts = async (offset: number, options = {}) => {
  try {
    const response = await axios.get(
      API_URL + "findAllPosts/" + offset,
      options
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

export type PostFormData = {
  content: string;
  postPhotoUrl?: string;
  latitude?: number;
  longitude?: number;
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

export type CommentFormData = {
  postId: number;
  content: string;
  commentPhotoUrl?: string;
};

export const makeNewComment = async (formData: CommentFormData) => {
  try {
    const response = await axios.post(API_URL + "makeComment", formData);
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data.message);
      return response.data.comment;
    }
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export type CommentIdFormData = {
  commentId: number;
};

export const likeComment = async (formData: CommentIdFormData) => {
  try {
    const response = await axios.post(API_URL + "likeComment", formData);
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

export const deleteComment = async (formData: CommentIdFormData) => {
  try {
    const response = await axios.delete(API_URL + "deleteComment", {
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
