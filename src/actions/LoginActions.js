import { handleCodeError } from "../helpers/handleRequest";
import { fetching, notFetching } from "./GeneralActions";
import { LOGIN_SUCCESS , BASE_URL } from "./types";

const axios = require('axios');

export const fetchingLoginSuccess = json => ({
  type: LOGIN_SUCCESS,
  payload: json
});



export const fetchLogin = (data,successCallBack,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
      }
    };

    let request = axios.post(BASE_URL+"/api/login",data, axiosConfig).then( response => {

      dispatch(fetchingLoginSuccess(response.data));

      dispatch(notFetching());

      successCallBack ? successCallBack():null;

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching());



    });


  }
}
