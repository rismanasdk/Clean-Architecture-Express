const { AppError } = require("../../../shared/errors/app-error");
const { z } = require("zod");

const userPayloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Email is invalid"),
});

const validateUserPayload = (req, _res, next) => {
  const result = userPayloadSchema.safeParse(req.body);

  if (!result.success) {
    return next(
      new AppError("Validation failed", 400, {
        fields: result.error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path.join("."),
        })),
      }),
    );
  }

  req.body = result.data;
  next();
};

module.exports = { validateUserPayload };
