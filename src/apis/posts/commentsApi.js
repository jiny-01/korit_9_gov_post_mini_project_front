import { api } from "../config/axiosConfig";

export const createComments = (postId, data) => {
  return api.post(`/api/posts/${postId}/comments`, data);
};

export const getComments = (postId) => {
  return api.get(`/api/posts/${postId}/comments`);
};
