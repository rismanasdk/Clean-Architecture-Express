const { AppError } = require("../../../shared/errors/app-error");

class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

module.exports = { GetUser };
