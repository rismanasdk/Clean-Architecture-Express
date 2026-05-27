const pinoHttp = require("pino-http");
const { logger } = require("../../../infrastructure/logging/logger");

const httpLogger = pinoHttp({
  logger,
  quietReqLogger: true,
  customLogLevel(_req, res, err) {
    if (err || res.statusCode >= 500) {
      return "error";
    }

    if (res.statusCode >= 400) {
      return "warn";
    }

    return "info";
  },
  customSuccessMessage(req, res) {
    return `${req.method} ${req.originalUrl} completed with ${res.statusCode}`;
  },
  customErrorMessage(req, res) {
    return `${req.method} ${req.originalUrl} failed with ${res.statusCode}`;
  },
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.originalUrl,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

module.exports = { httpLogger };
