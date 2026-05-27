const { env } = require("./config/env");
const { ListUsers } = require("./application/use-cases/users/list-users");
const { GetUser } = require("./application/use-cases/users/get-user");
const { CreateUser } = require("./application/use-cases/users/create-user");
const { UpdateUser } = require("./application/use-cases/users/update-user");
const { DeleteUser } = require("./application/use-cases/users/delete-user");
const {
  InMemoryUserRepository,
} = require("./infrastructure/repositories/in-memory-user-repository");
const { HealthController } = require("./interfaces/controllers/health-controller");
const { UserController } = require("./interfaces/controllers/user-controller");

const buildContainer = () => {
  const userRepository = new InMemoryUserRepository();

  const listUsers = new ListUsers(userRepository);
  const getUser = new GetUser(userRepository);
  const createUser = new CreateUser(userRepository);
  const updateUser = new UpdateUser(userRepository);
  const deleteUser = new DeleteUser(userRepository);

  const healthController = new HealthController(env);
  const userController = new UserController({
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  });

  return {
    env,
    controllers: {
      healthController,
      userController,
    },
  };
};

module.exports = { buildContainer };
