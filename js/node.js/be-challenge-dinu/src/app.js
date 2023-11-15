const express = require("express");
require("express-async-errors");
const app = express();
app.use(express.json());

const { sequelize } = require("./config/sequelize");
require("./modules/profile/profile.model.js");
require("./modules/contract/contract.model.js");
require("./modules/job/job.model.js");

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

const morgan = require("morgan");
app.use(
  morgan(
    "dev",
    ":method :url :status :res[content-length] - :response-time ms - [:date[clf]]",
  ),
);

const { getProfile } = require("./middleware/getProfile");
app.use(getProfile);

const contractRouter = require("./modules/contract/contract.routes");
const jobsRouter = require("./modules/job/job.routes");
app.use("/contracts", contractRouter);
app.use("/jobs", jobsRouter);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
