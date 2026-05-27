const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config({ quiet: true });

const envSchema = z.object({
  APP_NAME: z.string().min(1).default("clean-architecture-express"),
  CORS_ORIGIN: z.string().min(1).default("*"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const message = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");

  throw new Error(`Invalid environment configuration: ${message}`);
}

const env = {
  appName: parsedEnv.data.APP_NAME,
  corsOrigin: parsedEnv.data.CORS_ORIGIN,
  logLevel: parsedEnv.data.LOG_LEVEL,
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
};

module.exports = { env };
