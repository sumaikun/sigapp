import { LIST_KIND_OF_ACTIVITY } from "../actions/types";

const initialState = {
  list:[],  
};

const TypeActivitiesReducer = (state = initialState, action) => {
  switch(action.type) {

    case LIST_KIND_OF_ACTIVITY:
      state = {
        ...state,
        list:action.payload
      }
      return state;

    default:
      return state;
  }
}

export default TypeActivitiesReducer;
