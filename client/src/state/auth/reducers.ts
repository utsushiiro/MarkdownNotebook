import { Reducer } from "redux";
import { AuthState } from "./types";
import { Action, actionTypes } from "./actions";
import storage from "../storage";

const initialState: AuthState = {
  loginUser: storage.getLoginUser(),
  isLoading: false
};

const auth: Reducer<AuthState, Action> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGIN.DONE:
      return {
        ...state,
        loginUser: action.payload.user,
        isLoading: false
      };
    case actionTypes.LOGIN.FAILED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.LOGOUT.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGOUT.DONE:
      return {
        ...state,
        loginUser: null,
        isLoading: false
      };
    case actionTypes.LOGOUT.FAILED:
      return {
        ...state,
        isLoading: false
      };

    case actionTypes.SIGN_UP.STARTED:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SIGN_UP.DONE:
      return {
        ...state,
        loginUser: action.payload.user,
        isLoading: false
      };
    case actionTypes.SIGN_UP.FAILED:
      return {
        ...state,
        isLoading: false
      };
    default:
      const _: never = action;
      return state;
  }
};

export default auth;
