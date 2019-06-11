import { CREATE_ACTIVITY, DELETE, EDIT_ACTIVITY, UPDATE_ACTIVITY, LIST_ACTIVITIES,
GENERATE_DASHBOARD , ACTIVITY_TO_REPLICATE , CUSTOMER_TO_REPLICATE, SET_DATE_FROM_CALENDAR
} from "../actions/types";

//let initialDashBoard = {"total_hours":"7","popularCustomers":[{"tp_empresa":1,"customer":{"id":1,"nombre":"GAS NATURAL DEL ORIENTE S.A. ESP","created_at":"2016-09-16 15:43:28","updated_at":"2016-11-16 22:01:48","deleted_at":null,"nit":"890205952-7","telefono":"3485500","direccion":"Calle 72 No. 6-30 Ofc 1601 Edi","ciudad":2,"contacto":"","cliente":1,"user":44,"abbr":null},"totalTime":"6"},{"tp_empresa":2,"customer":{"id":2,"nombre":"EMERALD ENERGY PLC SUCURSAL COLOMBIA ","created_at":"2016-09-16 19:30:56","updated_at":"2016-11-17 14:34:17","deleted_at":null,"nit":"830024043-1","telefono":"6513500","direccion":"Cra. 9A No. 99-02 Oficina 603 ","ciudad":2,"contacto":"","cliente":1,"user":14,"abbr":null},"totalTime":"1"}]}

let initialDashBoard = null;

//console.log(initialDashBoard);


const initialState = {
  userActivities:[],
  isFetching: false,
  activityToedit:null,
  buttonSubmitTitle:'Registrar actividad',
  dashboard: initialDashBoard,
  activityToReplicate:null,
  customerToReplicate:null,
  dateFromCalendar:null
};

const ActivityReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ACTIVITY:
      state = {
        ...state,
        isFetching:false,
        buttonSubmitTitle:'Registrar actividad',
        activityToedit:null
      }
      console.log("Here go to create");
      return state;
    case DELETE:
      console.log("Here go to delete");
      return state;
    case EDIT_ACTIVITY:
      state = {
        ...state,
        activityToedit:action.payload,
        buttonSubmitTitle:'Registrar Cambios',
      }
      console.log("Here go to edit");
      return state;
    case UPDATE_ACTIVITY:
      state = {
        ...state,
        isFetching:false,
      }
      console.log("Here go to update");
      return state;
    case LIST_ACTIVITIES:
      state = {
        ...state,
        isFetching:false,
        userActivities:action.payload
      }
      return state;
    case GENERATE_DASHBOARD:
      state = {
        ...state,
        dashboard: action.payload
      }
      return state;
    case ACTIVITY_TO_REPLICATE:
      state = {
        ...state,
        activityToReplicate:action.payload,
      }
    case CUSTOMER_TO_REPLICATE:
      state = {
        ...state,
        customerToReplicate:action.payload,
      }
    case SET_DATE_FROM_CALENDAR:
      state = {
        ...state,
        dateFromCalendar:action.payload,
      }
      return state;
    default:
      return state;
  }
}

export default ActivityReducer;
