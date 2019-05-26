import { combineReducers } from "redux";
import ActivityReducer from './ActivityReducer';
import LoginReducer from './LoginReducer';
import TypeActivitiesReducer from './TypeActivitiesReducer';
import EnterpriseParameterReducer from './EnterpriseParameterReducer';
import appStateReducer from "./appStateReducer";


export default combineReducers({
  activity: ActivityReducer,
  login: LoginReducer,
  kindOfactivity: TypeActivitiesReducer,
  enterpriseParameter: EnterpriseParameterReducer,
  appState: appStateReducer,
});
