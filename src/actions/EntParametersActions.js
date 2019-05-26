import { handleCodeError } from "../helpers/handleRequest";
import { fetching, notFetching } from "./GeneralActions";
import { LIST_OF_CUSTOMERS, LIST_OF_COMPANIES , BASE_URL } from "./types";

const axios = require('axios');


export const companiesList = json => ({
  type: LIST_OF_COMPANIES,
  payload: json
});

export const customersList = json => ({
  type: LIST_OF_CUSTOMERS,
  payload: json
});

export const getCustomersParameter = (successCallBack,errorCallBack) => {
  return async dispatch => {

    

    dispatch(fetching());

    let request = axios.get(BASE_URL+"/api/customers").then( response => {

      dispatch(customersList(response.data));

      successCallBack ? successCallBack():null;

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });

  }
}

export const getCompaniesParameter = (data,successCallBack,errorCallBack) => {
  return async dispatch => {

    console.log(data);

    dispatch(fetching());

    let request = axios.get(BASE_URL+"/api/enterprises").then( response => {

      dispatch(companiesList(response.data));

      successCallBack ? successCallBack():null;

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });

  }
}
