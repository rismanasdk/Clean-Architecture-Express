const { User } = require("../../../domain/entities/user");
const { AppError } = require("../../../shared/errors/app-error");

class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, payload) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    const duplicatedEmail = await this.userRepository.findByEmail(payload.email);
    if (duplicatedEmail && duplicatedEmail.id !== id) {
      throw new AppError("Email already exists", 409);
    }

    const updatedUser = User.create({
      id: existingUser.id,
      name: payload.name,
      email: payload.email,
      createdAt: existingUser.createdAt,
      updatedAt: new Date().toISOString(),
    });

    return this.userRepository.update(id, updatedUser);
  }
}

module.exports = { UpdateUser };
