class UserController {
  constructor({ listUsers, getUser, createUser, updateUser, deleteUser }) {
    this.listUsers = listUsers;
    this.getUser = getUser;
    this.createUser = createUser;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
  }

  async index(_req, res) {
    const users = await this.listUsers.execute();
    res.status(200).json({ success: true, data: users });
  }

  async show(req, res) {
    const user = await this.getUser.execute(req.params.id);
    res.status(200).json({ success: true, data: user });
  }

  async store(req, res) {
    const user = await this.createUser.execute(req.body);
    res.status(201).json({ success: true, data: user });
  }

  async update(req, res) {
    const user = await this.updateUser.execute(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  }

  async destroy(req, res) {
    await this.deleteUser.execute(req.params.id);
    res.status(204).send();
  }
}

module.exports = { UserController };
