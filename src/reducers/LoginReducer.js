import { FETCH, LOGOUT, LOGIN_SUCCESS, FETCH_FAIL } from "../actions/types";

import { loadState } from '../helpers/appStorage';

const loadedData = loadState();

let initialuser = {}

const initialState = loadedData ? loadedData.login  : {
  user: initialuser,
  isLogged: false,
};

const LoginReducer = (state = initialState, action) => {
  switch(action.type) {


    case LOGIN_SUCCESS:
      state = {
        ...state,
        isLogged:true,
        user:action.payload,
      }
      console.log(state);
      return state;

    case LOGOUT:
      state = {
        ...state,
        isLogged:false,
        user:null,
      }
      console.log(state);
    return state;

    default:
      return state;
  }
}

export default LoginReducer;
