const { test, after, beforeEach, describe, before } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const {
  genericUser,
  genericBlog,
  checkAndCreateUser,
  checkAndCreateBlog,
} = require("./testing_api.helper");

const api = supertest(app.app);

before(async () => {
  await app.dbConnect;
});

test("that deleting all users and blogs yields 0 users and 0 blogs", async () => {
  console.log("process.env", process.env.NODE_ENV);
  console.log("before check and create blog");
  checkAndCreateBlog(genericBlog);
  console.log("before check and create user");
  checkAndCreateUser(genericUser);

  console.log("after check and create user");

  await api.post("/api/testing/reset");

  console.log("made post request to reset");

  const userResponse = await api.get("/api/users");

  console.log("made get request to users", userResponse.body.length);

  assert.strictEqual(userResponse.body.length, 0);

  const blogResponse = await api.get("/api/blogs");

  console.log("made get request to blogs", blogResponse.body);

  assert.strictEqual(blogResponse.body.length, 0);
});
