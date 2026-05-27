const { AppError } = require("../../../shared/errors/app-error");

class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    await this.userRepository.delete(id);
  }
}

module.exports = { DeleteUser };
