import { FETCH_CODES_REQUEST, FETCH_CODES_SUCCESS } from "./common.actions";

const initialState = {
  loading: false,
  codes: [],
};

const commonCodeReducer = (_state, action) => {
  const state = _state || initialState;
  switch (action.type) {
    case FETCH_CODES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CODES_SUCCESS:
      return {
        ...state,
        loading: false,
        codes: action.payload,
      };
    default:
      return state;
  }
};

export default commonCodeReducer;
