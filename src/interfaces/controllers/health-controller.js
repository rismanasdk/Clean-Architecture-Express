class HealthController {
  constructor(env) {
    this.env = env;
  }

  check(_req, res) {
    res.status(200).json({
      success: true,
      message: "Service is healthy",
      data: {
        appName: this.env.appName,
        environment: this.env.nodeEnv,
      },
    });
  }
}

module.exports = { HealthController };
