import { handleCodeError } from "../helpers/handleRequest";
import { fetching, notFetching } from "./GeneralActions";
import { LIST_KIND_OF_ACTIVITY , BASE_URL } from "./types";

const axios = require('axios');


export const activityParameterList = json => ({
  type: LIST_KIND_OF_ACTIVITY,
  payload: json
});

export const getListActivitiesParameter = (successCallBack,errorCallBack) => {
  return async dispatch => {


    dispatch(fetching());

    let request = axios.get(BASE_URL+"/api/listActivities").then( response => {

      dispatch(activityParameterList(response.data));

      successCallBack ? successCallBack():null;

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });

  }
}
