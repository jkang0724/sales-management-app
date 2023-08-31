const jwt = require("jsonwebtoken");
require("dotenv").config();

const getHeaderAccessToken = (response) =>
  // remove 'Bearer ' prefix if access token exists in request header
  response.headers.authorization?.slice(7);

const getSessionAccessToken = (req) => req.session?.token;

const setSessionWithAccessToken = (req, response) => {
  const token = getHeaderAccessToken(response);
  req.session.token = token;
};

const setSessionWithUser = (req, response) => {
  const user = response.data[0];

  req.session.user = { ...user, user_pw: null };
  req.session.locale = user.locale_preference;
};

const setUserRequestWithAccessToken = (req) => {
  const token = getSessionAccessToken(req);
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
};

const validateSessionToken = (req) => {
  const token = getSessionAccessToken(req);
  return token && jwt.verify(token, process.env.JWT_SECRET);
  // to be implemented: request refresh token if token is invalid
};

const validateSessionMiddleware = (req, res, next) => {
  try {
    const verifiedToken = validateSessionToken(req, res);
    if (verifiedToken) {
      next();
    }
  } catch (error) {
    req.session.user = null;
    return res
      .status(401)
      .send({ message: "Unauthorized request", isAuthenticated: false });
  }
  return null;
};

module.exports = {
  setSessionWithAccessToken,
  setSessionWithUser,
  setUserRequestWithAccessToken,
  validateSessionMiddleware,
  getSessionAccessToken,
};
