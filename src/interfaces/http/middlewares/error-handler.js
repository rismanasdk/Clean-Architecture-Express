const { AppError } = require("../../../shared/errors/app-error");
const { logger } = require("../../../infrastructure/logging/logger");

const errorHandler = (err, req, res, _next) => {
  const requestLogger = req.log || logger;

  if (err instanceof AppError) {
    requestLogger.warn(
      {
        err,
        details: err.details,
        path: req.originalUrl,
        method: req.method,
      },
      err.message,
    );

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }

  requestLogger.error(
    {
      err,
      path: req.originalUrl,
      method: req.method,
    },
    "Unhandled application error",
  );

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = { errorHandler };
