import { handleCodeError } from "../helpers/handleRequest";
import { fetching, notFetching } from "./GeneralActions";
import { CREATE_ACTIVITY, LIST_ACTIVITIES, BASE_URL, EDIT_ACTIVITY, UPDATE_ACTIVITY,
GENERATE_DASHBOARD , ACTIVITY_TO_REPLICATE , CUSTOMER_TO_REPLICATE , SET_DATE_FROM_CALENDAR
} from "./types";

const axios = require('axios');


export const userActivityList = json => ({
  type: LIST_ACTIVITIES,
  payload: json
});

export const activityCreated = json => ({
  type: CREATE_ACTIVITY
});

export const setActivityToedit = json => ({
  type: EDIT_ACTIVITY,
  payload: json,
});

export const activityUpdated = json => ({
  type: UPDATE_ACTIVITY,
});

export const generateUserDashboard = json => ({
  type: GENERATE_DASHBOARD,
  payload: json
});

export const replicateActivity = json => ({
  type: ACTIVITY_TO_REPLICATE,
  payload: json
});

export const replicateOnlyCustomer = data => ({
  type: CUSTOMER_TO_REPLICATE,
  payload: data
});

export const setDateFromCalendar = data => ({
  type: SET_DATE_FROM_CALENDAR,
  payload: data
});

export const userActivities = (data,successCallBack,errorCallBack) => {
  return async dispatch => {

    console.log(data);

    dispatch(fetching());

    let request = axios.get(BASE_URL+"/api/activitiesbyUser/"+data).then( response => {

      console.log(response);

      dispatch(userActivityList(response.data));

      successCallBack ? successCallBack():null;

      dispatch(notFetching(""));

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });

  }
}

export const userDayActivities = (data,successCallBack,errorCallBack) => {
  return async dispatch => {

    console.log(data);

    dispatch(fetching());

    let request = axios.get(BASE_URL+"/api/activitiesbyUser/"+data.userId+"/"+data.date).then( response => {

      dispatch(userActivityList(response.data));

      successCallBack ? successCallBack():null;

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });

  }
}

export const registerActivity = (data,successCallBack,errorCallBack) => {
  return async dispatch => {
    console.log(data);

    dispatch(fetching());

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
      }
    };

    let request = axios.post(BASE_URL+"/api/activity",data, axiosConfig).then( response => {

      dispatch(activityCreated());

      successCallBack ? successCallBack():null;

      dispatch(notFetching(""));

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });
  }
}

export const updateActivity = (data,id,successCallBack,errorCallBack) => {
  return async dispatch => {
    console.log(data);
    console.log(id);

    dispatch(fetching());

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
      }
    };

    let request = axios.put(BASE_URL+"/api/activity/"+id,data, axiosConfig).then( response => {

      dispatch(activityUpdated());

      successCallBack ? successCallBack():null;

      dispatch(notFetching(""));

    }).catch( error => {

      console.log(error.response);

      handleCodeError(error);

      errorCallBack ? errorCallBack():null;

      dispatch(notFetching(""));

    });

  }
}

export const dashBoardUserData = (id) => {
  return async dispatch => {
    let request = axios.get(BASE_URL+"/api/dashboard/"+id).then( response => {
      dispatch((generateUserDashboard(response.data)));
      dispatch(notFetching());
    }).catch( error => {
      dispatch(notFetching(""));
      handleCodeError(error);

    });
  }
}
