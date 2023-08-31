import axios from "axios";
import { action } from "../../helpers/helpers";
import { setApiError } from "../../store/apiError/apiError.actions";

export const FETCH_CODES_REQUEST = "FETCH_CODES_REQUEST";
export const FETCH_CODES_SUCCESS = "FETCH_CODES_SUCCESS";

const fetchCodesRequest = action(FETCH_CODES_REQUEST);
const fetchCodesSuccess = action(FETCH_CODES_SUCCESS);

export const fetchCommonCodes = () => {
  return (dispatch) => {
    dispatch(fetchCodesRequest());
    axios
      .get("/api/code")
      .then((response) => {
        const commonCodes = response.data;
        dispatch(fetchCodesSuccess(commonCodes));
      })
      .catch((error) => {
        dispatch(setApiError(error.response));
      });
  };
};

export const fetchCodesByType = (type) => {
  return (dispatch) => {
    dispatch(fetchCodesRequest());
    axios
      .get(`/api/code/${type}`)
      .then((response) => {
        const typeCode = response.data;
        dispatch(fetchCodesSuccess(typeCode));
      })
      .catch((error) => {
        dispatch(setApiError(error.response));
      });
  };
};
