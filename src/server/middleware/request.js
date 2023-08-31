const axios = require("axios");
const {
  setUserRequestWithAccessToken,
  getSessionAccessToken,
  setSessionWithUser,
  setSessionWithAccessToken,
} = require("./tokenManager");
require("dotenv").config();

const { SERVICE_URL, SERVICE_PATH, SERVICE_CLIENT_ID, SERVICE_CLIENT_KEY } =
  process.env;

const baseURL = SERVICE_URL;
const axiosInstance = axios.create({
  baseURL,
});

const requestSend = async (req) => {
  // url contains url/:params, method = HTTP request,
  // body = queryString & queryParams
  const { url, method, body, headers } = req;
  try {
    setUserRequestWithAccessToken(req);
    const httpResponse = await axiosInstance({
      url,
      method,
      data: body,
      headers,
    });
    return httpResponse;
  } catch (error) {
    if (error.response?.status) {
      return error.response;
    }
    const newError = new Error("Request error");
    newError.status = 500;
    newError.data = { message: "Internal service error" };
    throw newError;
  }
};

const requestTokenMiddleware = async (req, res, next) => {
  if (getSessionAccessToken(req)) {
    return next();
  }
  try {
    const httpResponse = await axiosInstance({
      url: SERVICE_PATH,
      method: "POST",
      data: { clientId: SERVICE_CLIENT_ID, clientKey: SERVICE_CLIENT_KEY },
    });
    if (httpResponse.status === 200) {
      setSessionWithAccessToken(req, httpResponse);
      next();
    }
  } catch (error) {
    const { response } = error;
    if (response) {
      return res.status(response.status || 401).send(response.data);
    }
    next(error);
  }
  return null;
};

const makeRequest = async (req, res, next) => {
  try {
    const response = await requestSend(req);
    req.apiResponse = response;
    req.apiResponseBody = response.data;
    next();
  } catch (error) {
    const { message } = error.data;
    return res.status(error.status || 500).send({ message });
  }
  return null;
};

const handleError = (req, res, next) => {
  const { apiResponse, apiResponseBody } = req;
  const { status } = apiResponse;
  const { message } = apiResponseBody;

  if (!status) {
    throw new Error("No valid API response");
  }
  if (status === 200) {
    return next();
  }
  if (status === 401) {
    req.session.user = null;
  }
  return res.status(status).send({ message });
};

const returnResponse = (req, res) => {
  const { data, status } = req.apiResponse;
  return res.status(status).send(data);
};

const logoutRequestMiddleware = (req, res) => {
  req.session.user = null;

  return res.send({ isAuthenticated: false, user: null });
};

const getSessionRequestMiddleware = (req, res) => {
  const { user } = req.session;

  if (user) {
    return res.send({ isAuthenticated: true, user });
  }

  return res.status(200).send({ isAuthenticated: false });
};

const requestMiddleware = [makeRequest, handleError, returnResponse];

module.exports = {
  requestMiddleware,
  logoutRequestMiddleware,
  getSessionRequestMiddleware,
  requestTokenMiddleware,
};
