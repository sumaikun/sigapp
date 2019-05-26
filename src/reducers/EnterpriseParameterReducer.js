import { LIST_OF_CUSTOMERS,  LIST_OF_COMPANIES } from "../actions/types";

const initialState = {
  customers:[],
  companies:[],
};

const EnterpriseParameterReducer = (state = initialState, action) => {
  switch(action.type) {

    case LIST_OF_CUSTOMERS:
      state = {
        ...state,
        customers:action.payload
      }
      return state;
    case LIST_OF_COMPANIES:
      state = {
        ...state,
        companies:action.payload
      }
      return state;
    default:
      return state;
  }
}

export default EnterpriseParameterReducer;
