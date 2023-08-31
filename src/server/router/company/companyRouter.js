const express = require("express");
const {
  requestMiddleware,
  requestTokenMiddleware,
} = require("../../middleware/request");
const { validateSessionMiddleware } = require("../../middleware/tokenManager");

const companyRouter = () => {
  const router = express.Router();
  router.get("/company", requestTokenMiddleware, requestMiddleware);
  router.get("/company/:id", validateSessionMiddleware, requestMiddleware);
  router.post("/company", validateSessionMiddleware, requestMiddleware);
  router.delete("/company/:id", validateSessionMiddleware, requestMiddleware);
  router.get("/company_employee", validateSessionMiddleware, requestMiddleware);
  router.get(
    "/company_employee/:id",
    validateSessionMiddleware,
    requestMiddleware,
  );
  router.post(
    "/company_employee",
    validateSessionMiddleware,
    requestMiddleware,
  );
  router.delete(
    "/company_employee/:id",
    validateSessionMiddleware,
    requestMiddleware,
  );
  return router;
};

module.exports = {
  companyRouter,
};
