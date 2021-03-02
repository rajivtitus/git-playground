import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userProfile")).token
    }`;
  }
  return req;
});

export const fetchPostsURL = () => API.get("/posts");
export const createPostURL = (newPost) => API.post("/posts", newPost);
export const updatePostURL = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePostURL = (id) => API.delete(`posts/${id}`);
export const likePostURL = (id) => API.patch(`/posts/${id}/like`);

export const signInURL = (formData) => API.post("/user/signin", formData);
export const signUpURL = (formData) => API.post("/user/signup", formData);
