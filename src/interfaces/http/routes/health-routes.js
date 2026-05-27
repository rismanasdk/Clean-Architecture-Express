const { Router } = require("express");

const createHealthRoutes = (healthController) => {
  const router = Router();

  router.get("/", healthController.check.bind(healthController));

  return router;
};

module.exports = { createHealthRoutes };
