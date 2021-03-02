//Import Constants
import * as actionTypes from "../constants/actionTypes";

const defaultState = {
  userData: null,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem("userProfile", JSON.stringify({ ...action.payload }));
      return { ...state, userData: action.payload };

    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, userData: null };

    default:
      return state;
  }
};

export default authReducer;
