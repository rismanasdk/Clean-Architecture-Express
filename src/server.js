const { createApp } = require("./app");
const { env } = require("./config/env");
const { logger } = require("./infrastructure/logging/logger");

const app = createApp();
const server = app.listen(env.port, () => {
  logger.info(
    {
      appName: env.appName,
      environment: env.nodeEnv,
      port: env.port,
    },
    "HTTP server started",
  );
});

let isShuttingDown = false;

const shutdown = (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logger.warn({ signal }, "Shutdown signal received");

  server.close((err) => {
    if (err) {
      logger.error({ err }, "Error while closing HTTP server");
      process.exit(1);
    }

    logger.info("HTTP server closed");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception");
  shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  logger.fatal({ reason }, "Unhandled rejection");
  shutdown("unhandledRejection");
});
