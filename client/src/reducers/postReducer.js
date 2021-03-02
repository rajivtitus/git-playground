//Import Constants
import * as actionTypes from "../constants/actionTypes";

const defaultState = [];

const postReducer = (posts = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      return action.payload;

    case actionTypes.CREATE_POST:
      return [...posts, action.payload];

    case actionTypes.UPDATE_POST:
    case actionTypes.LIKE_POST:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    case actionTypes.DELETE_POST:
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};

export default postReducer;
