export const BASE_URL = window.location.href.indexOf('localhost') > 0 ? 'http://localhost:8000' : 'http://portalsig.grupo-sig.com';

//ajax
export const FETCH = "FETCH";
export const CANCEL_FETCH = "CANCEL_FETCH";1242
//USER
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
//CRUD
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const DELETE = "DELETE";
export const EDIT_ACTIVITY = "EDIT_ACTIVITY";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
export const LIST_ACTIVITIES = "LISTACTIVITIES";
export const ACTIVITY_TO_REPLICATE = "ACTIVITY_TO_REPLICATE";
export const CUSTOMER_TO_REPLICATE = "CUSTOMER_TO_REPLICATE";

//PARAMETERS
export const LIST_KIND_OF_ACTIVITY = "LIST_KIND_OF_ACTIVITY";
export const LIST_OF_CUSTOMERS = "LIST_OF_CUSTOMERS";
export const LIST_OF_COMPANIES = "LIST_OF_COMPANIES";

//DASHBOARD
export const GENERATE_DASHBOARD = "GENERATE_DASHBOARD";

//CALENDAR
export const SET_DATE_FROM_CALENDAR = "SET_DATE_FROM_CALENDAR";
