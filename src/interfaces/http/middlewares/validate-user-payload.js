const { AppError } = require("../../../shared/errors/app-error");

const validateUserPayload = (req, _res, next) => {
  const { name, email } = req.body || {};

  if (typeof name !== "string" || !name.trim()) {
    return next(new AppError("Name is required", 400));
  }

  if (typeof email !== "string" || !email.trim()) {
    return next(new AppError("Email is required", 400));
  }

  next();
};

module.exports = { validateUserPayload };
