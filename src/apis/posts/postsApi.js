import { api } from "../config/axiosConfig";

export const createPost = (formData) => {
  return api.post("/api/posts", formData);
};

export const getFeeds = (params) => {
  return api.get("/api/posts/feeds", {params});
};
