import { combineReducers } from "redux";
//Import Reducers
import postReducer from "./postReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  posts: postReducer,
  user: authReducer,
});

export default rootReducer;
