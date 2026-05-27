const crypto = require("crypto");
const { User } = require("../../../domain/entities/user");
const { AppError } = require("../../../shared/errors/app-error");

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(payload) {
    const existingUser = await this.userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const user = User.create({
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
    });

    return this.userRepository.create(user);
  }
}

module.exports = { CreateUser };
