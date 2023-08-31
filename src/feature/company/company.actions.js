import axios from "axios";
import { action, snakeToCamel } from "../../helpers/helpers";
import { setApiError } from "../../store/apiError/apiError.actions";

// action types
export const FETCH_COMPANIES_REQUEST = "FETCH_COMPANIES_REQUEST";
export const FETCH_COMPANIES_SUCCESS = "FETCH_COMPANIES_SUCCESS";
export const FETCH_COMPANY_REQUEST = "FETCH_COMPANY_REQUEST";
export const FETCH_COMPANY_SUCCESS = "FETCH_COMPANY_SUCCESS";
export const SAVE_COMPANY_REQUEST = "SAVE_COMPANY_REQUEST";
export const SAVE_COMPANY_SUCCESS = "SAVE_COMPANY_SUCCESS";
export const DELETE_COMPANY_REQUEST = "DELETE_COMPANY_REQUEST";
export const DELETE_COMPANY_SUCCESS = "DELETE_COMPANY_SUCCESS";
export const COMPANY_RESET = "COMPANY_RESET";

// action creators
const fetchCompaniesRequest = action(FETCH_COMPANIES_REQUEST);
const fetchCompaniesSuccess = action(FETCH_COMPANIES_SUCCESS);
const fetchCompanyRequest = action(FETCH_COMPANY_REQUEST);
const fetchCompanySuccess = action(FETCH_COMPANY_SUCCESS);
const saveCompanyRequest = action(SAVE_COMPANY_REQUEST);
const saveCompanySuccess = action(SAVE_COMPANY_SUCCESS);
const deleteCompanyRequest = action(DELETE_COMPANY_REQUEST);
const deleteCompanySuccess = action(DELETE_COMPANY_SUCCESS);
export const reset = action(COMPANY_RESET);

// axios HTTP requests
export const fetchCompanies = () => {
  return (dispatch) => {
    dispatch(fetchCompaniesRequest());
    axios
      .get("/api/company")
      .then((response) => {
        const companies = snakeToCamel(response.data);
        dispatch(fetchCompaniesSuccess(companies));
      })
      .catch((error) => {
        dispatch(setApiError(error.response));
      });
  };
};

export const fetchCompany = (id) => {
  return (dispatch) => {
    dispatch(fetchCompanyRequest());
    axios
      .get(`/api/company/${id}`)
      .then((response) => {
        const responseObj = { ...snakeToCamel(response.data[0])[0] };
        dispatch(fetchCompanySuccess(responseObj));
      })
      .catch((error) => {
        dispatch(setApiError(error.response));
      });
  };
};

export const saveCompany = (company) => {
  return (dispatch) => {
    dispatch(saveCompanyRequest());
    axios
      .post("/api/company", company)
      .then(() => {
        dispatch(saveCompanySuccess());
      })
      .catch((error) => {
        dispatch(setApiError(error.response));
      });
  };
};

export const deleteCompany = (id) => {
  return (dispatch) => {
    dispatch(deleteCompanyRequest());
    axios
      .delete(`/api/company/${id}`)
      .then(() => {
        dispatch(deleteCompanySuccess());
      })
      .catch((error) => {
        dispatch(setApiError(error.response));
      });
  };
};
