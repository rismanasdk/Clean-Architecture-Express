const pino = require("pino");
const { env } = require("../../config/env");

const loggerOptions = {
  level: env.logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
};

if (env.nodeEnv === "development") {
  loggerOptions.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

const logger = pino(loggerOptions);

module.exports = { logger };
