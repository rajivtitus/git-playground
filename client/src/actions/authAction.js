import { signUpURL, signInURL } from "../api";
import { LOGIN } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const user = await signInURL(formData);

    dispatch({
      type: LOGIN,
      payload: user.data,
    });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const user = await signUpURL(formData);

    dispatch({
      type: LOGIN,
      payload: user.data,
    });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
