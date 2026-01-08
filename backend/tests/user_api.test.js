const mongoose = require("mongoose");
const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");
const supertest = require("supertest");

const api = supertest(app.app);

describe("when there is initially one user in the database", () => {
  beforeEach(async () => {
    await helper.deleteAndCreateRootUser();
  });

  test("creation succeeds with a fresh username and validation requirements", async () => {
    let usersAtStart = undefined;
    try {
      usersAtStart = await helper.usersInDb();
    } catch (e) {
      console.log("error message: ", e.message);
    }

    const newUser = {
      username: "jaloomis",
      name: "Joe Loomis",
      password: process.env.TEST_USER_PASSWORD || "TestPassword123!",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test.only("creation fails with a fresh username and short username", async () => {
    let usersAtStart = undefined;
    try {
      usersAtStart = await helper.usersInDb();
    } catch (e) {
      console.log("error message: ", e.message);
    }

    const newUser = {
      username: "ja",
      name: "Joe Loomis",
      password: process.env.TEST_USER_PASSWORD || "TestPassword123!",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.ok(
      response.error.text.includes(
        "Username must be at least 3 characters long",
      ),
    );
  });

  test("creation fails with a fresh username and username with space", async () => {
    let usersAtStart = undefined;
    try {
      usersAtStart = await helper.usersInDb();
    } catch (e) {
      console.log("error message: ", e.message);
    }

    const newUser = {
      username: "joe loomis",
      name: "Joe Loomis",
      password: process.env.TEST_USER_PASSWORD || "TestPassword123!",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.ok(
      response.error.text.includes("username cannot contain whitespaces"),
    );
  });

  test("creation fails with a fresh username and incorrect password validation requirements", async () => {
    let usersAtStart = undefined;
    try {
      usersAtStart = await helper.usersInDb();
    } catch (e) {
      console.log("error message: ", e.message);
    }

    const newUser = {
      username: "jaloomis",
      name: "Joe Loomis",
      password: "invalidpassword",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.ok(
      response.error.text.includes(
        "Password must contain at least 1 upper case letter, 1 lower case, and 1 symbol: !@#$%&*",
      ),
    );
  });

  test("creation fails with proper statuscode and message if username already exists", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rootey",
      name: "superuser",
      password: process.env.TEST_USER_PASSWORD || "TestPassword123!",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
