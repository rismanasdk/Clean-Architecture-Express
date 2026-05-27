const dotenv = require("dotenv");

dotenv.config();

const env = {
  appName: process.env.APP_NAME || "clean-architecture-express",
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
  port: Number(process.env.PORT || 3000),
};

module.exports = { env };
