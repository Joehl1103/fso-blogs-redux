const app = require("../app");
const supertest = require("supertest");

const api = supertest(app.app);

const genericUser = {
  username: "username",
  name: "name",
  password: process.env.TEST_USER_PASSWORD || "TestPassword123!",
};

const checkAndCreateUser = async (genericUser) => {
  const response = await api.get("/api/users");

  if (response.body.length === 0) {
    console.log("no users in test database");
    await api.post("/api/users", genericUser);

    console.log("user created");
  }
};

const genericBlog = {
  title: "title",
  author: "author",
  url: "url",
};

const checkAndCreateBlog = async (genericBlog) => {
  const response = await api.get("/api/blogs");

  if (response.body.length === 0) {
    console.log("no blogs in test database");
    await api.post("/api/users", genericBlog);

    console.log("blog created");
  }
};

module.exports = {
  genericUser,
  checkAndCreateUser,
  genericBlog,
  checkAndCreateBlog,
};
