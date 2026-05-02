const request = require("supertest");
const app = require("../src/app");
const { AppDataSource } = require("../src/config/data-source");
const userRepo = require("../src/repositories/userRepository");

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterEach(async () => {
  await userRepo.clearAll();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("POST /users", () => {

  test("should create user and store in DB", async () => {
    const userData = {
      name: "Ali",
      email: "ali@test.com"
    };

    const res = await request(app)
      .post("/api/users")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ali");

    const users = await userRepo.findAll();
    expect(users.length).toBe(1);
    expect(users[0].email).toBe("ali@test.com");
  });

  test("should fail if name is missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "test@test.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Name is required");
  });

  test("should fail if email is missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Ali" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Email is required");
  });

  test("should fail if email already exists", async () => {
    const userData = {
      name: "Ali",
      email: "ali@test.com"
    };

    await request(app).post("/api/users").send(userData);

    const res = await request(app)
      .post("/api/users")
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Email already exists");
  });

});