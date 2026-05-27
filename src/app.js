const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { env } = require("./config/env");
const { buildContainer } = require("./container");
const { createHealthRoutes } = require("./interfaces/http/routes/health-routes");
const { createUserRoutes } = require("./interfaces/http/routes/user-routes");
const { httpLogger } = require("./interfaces/http/middlewares/http-logger");
const { notFoundHandler } = require("./interfaces/http/middlewares/not-found-handler");
const { errorHandler } = require("./interfaces/http/middlewares/error-handler");

const createApp = () => {
  const app = express();
  const { controllers } = buildContainer();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin:
        env.corsOrigin === "*"
          ? true
          : env.corsOrigin.split(",").map((origin) => origin.trim()),
    }),
  );
  app.use(express.json());
  app.use(httpLogger);

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Clean Architecture Express API",
    });
  });

  app.use("/health", createHealthRoutes(controllers.healthController));
  app.use("/users", createUserRoutes(controllers.userController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };
