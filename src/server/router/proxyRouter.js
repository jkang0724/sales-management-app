const express = require("express");
const { userRouter } = require("./user/userRouter");
const { codeRouter } = require("./common/codeRouter");
const { employeeRouter } = require("./employee/employeeRouter");
const { companyRouter } = require("./company/companyRouter");
const { projectRouter } = require("./project/projectRouter");
const { invoiceRouter } = require("./invoice/invoiceRouter");

const proxyRouter = () => {
  const router = express.Router();
  router.use(userRouter());
  router.use(codeRouter());
  router.use(employeeRouter());
  router.use(companyRouter());
  router.use(projectRouter());
  router.use(invoiceRouter());
  return router;
};

module.exports = {
  proxyRouter,
};
