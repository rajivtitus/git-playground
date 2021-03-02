//Import API URL
import { fetchPostsURL, createPostURL, updatePostURL, deletePostURL, likePostURL } from "../api";
//import Constants
import * as actionTypes from "../constants/actionTypes";

//Action Creators
export const fetchPosts = () => async (dispatch) => {
  try {
    const posts = await fetchPostsURL();

    dispatch({
      type: actionTypes.FETCH_POSTS,
      payload: posts.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const post = await createPostURL(newPost);

    dispatch({
      type: actionTypes.CREATE_POST,
      payload: post.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const post = await updatePostURL(id, updatedPost);

    dispatch({
      type: actionTypes.UPDATE_POST,
      payload: post.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await deletePostURL(id);

    dispatch({
      type: actionTypes.DELETE_POST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const post = await likePostURL(id);

    dispatch({
      type: actionTypes.LIKE_POST,
      payload: post.data,
    });
  } catch (error) {
    console.log(error);
  }
};
