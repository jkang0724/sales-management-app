const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const { proxyRouter } = require("./router/proxyRouter");
const { reactAppRoute } = require("./reactProcess/reactAppRoute");

const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../../build")));
app.use(bodyParser.json());
app.use(
  session({
    secret: "sales",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use("/api", proxyRouter());
// Load React app
app.get("*", reactAppRoute);

const port = process.env.PORT;
app.listen(port);
