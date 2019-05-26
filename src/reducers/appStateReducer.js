import { FETCH , CANCEL_FETCH } from "../actions/types";

const initialState = {
  isFetching: false,
};

const appStateReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH:
      state = {
        ...state,
        isFetching: true,
      }
      return state;

    case CANCEL_FETCH:
    state = {
      ...state,
      isFetching:false,
    }
    return state;

    default:
      return state;
  }
}

export default appStateReducer;
