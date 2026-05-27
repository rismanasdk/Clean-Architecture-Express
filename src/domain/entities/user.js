const { AppError } = require("../../shared/errors/app-error");

class User {
  constructor({ id, name, email, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(payload) {
    User.validate(payload);

    const timestamp = new Date().toISOString();

    return new User({
      id: payload.id,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      createdAt: payload.createdAt || timestamp,
      updatedAt: payload.updatedAt || timestamp,
    });
  }

  static validate({ name, email }) {
    if (!name || typeof name !== "string" || !name.trim()) {
      throw new AppError("Name is required", 400);
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      throw new AppError("Email is required", 400);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      throw new AppError("Email is invalid", 400);
    }
  }
}

module.exports = { User };
