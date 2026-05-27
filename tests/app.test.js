const request = require("supertest");
const { createApp } = require("../src/app");

describe("Application routes", () => {
  const app = createApp();

  it("returns health status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("creates a user with valid payload", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Risman", email: "risman@example.com" });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe("risman@example.com");
  });

  it("rejects invalid payload", async () => {
    const response = await request(app).post("/users").send({ name: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation failed");
    expect(response.body.details.fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
          path: expect.any(String),
        }),
      ]),
    );
  });
});
