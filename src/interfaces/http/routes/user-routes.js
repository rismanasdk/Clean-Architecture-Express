const { Router } = require("express");
const { asyncHandler } = require("../../../shared/utils/async-handler");
const {
  validateUserPayload,
} = require("../middlewares/validate-user-payload");

const createUserRoutes = (userController) => {
  const router = Router();

  router.get("/", asyncHandler(userController.index.bind(userController)));
  router.get("/:id", asyncHandler(userController.show.bind(userController)));
  router.post(
    "/",
    validateUserPayload,
    asyncHandler(userController.store.bind(userController)),
  );
  router.put(
    "/:id",
    validateUserPayload,
    asyncHandler(userController.update.bind(userController)),
  );
  router.delete("/:id", asyncHandler(userController.destroy.bind(userController)));

  return router;
};

module.exports = { createUserRoutes };
