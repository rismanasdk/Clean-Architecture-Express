const { UserRepository } = require("../../domain/repositories/user-repository");

class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
  }

  async findAll() {
    return [...this.users];
  }

  async findById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email) {
    return (
      this.users.find(
        (user) => user.email.toLowerCase() === String(email).trim().toLowerCase(),
      ) || null
    );
  }

  async create(user) {
    this.users.push(user);
    return user;
  }

  async update(id, user) {
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = user;
    return user;
  }

  async delete(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

module.exports = { InMemoryUserRepository };
