import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  SAVE_COMPANY_REQUEST,
  SAVE_COMPANY_SUCCESS,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  COMPANY_RESET,
} from "./company.actions";

const initialState = {
  loading: false,
  companies: [],
  company: {},
  isOutdated: true,
};

const companyReducer = (_state, action) => {
  const state = _state || initialState;
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
    case FETCH_COMPANY_REQUEST:
    case SAVE_COMPANY_REQUEST:
    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload,
        isOutdated: false,
      };
    case FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
      };
    case SAVE_COMPANY_SUCCESS:
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        isOutdated: true,
      };
    case COMPANY_RESET:
      return initialState;
    default:
      return state;
  }
};

export default companyReducer;
