const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function setupProxy(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${process.env.PORT}`,
      changeOrigin: true,
    }),
  );
};
