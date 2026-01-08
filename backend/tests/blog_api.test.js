const { test, after, beforeEach, describe, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const api = supertest(app.app);

console.log("top of blog api test");

before(async () => {
  await app.dbConnect;
});

beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await helper.deleteAndCreateRootUser();
    await helper.deleteAndCreateRootBlogs();
  }
});

test("get all blogs", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);
  const initialBlogs = await helper.getInitialBlogs();
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("name of id equals `id`", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);
  assert.ok(response.body[0].hasOwnProperty("id"));
});

test.describe("posting blogs", async () => {
  test("post new blog", async () => {
    const newBlog = helper.newBlogPost;
    const id = await helper.userId();
    newBlog.user = id;
    const token = await helper.generateToken();

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const newBlogPostFromResponse = response.body[2];
    const initialBlogs = await helper.getInitialBlogs();
    assert.strictEqual(response.body.length, initialBlogs.length + 1);
    assert.strictEqual(newBlogPostFromResponse.title, newBlog.title);
  });

  test("fails with 401 if token not provided", async () => {
    const newBlog = helper.newBlogPost;
    const id = await helper.userId();
    newBlog.user = id;

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

test("if likes missing default to 0", async () => {
  const token = await helper.generateToken();

  await api
    .post("/api/blogs")
    .send(helper.newBlogsNoLikes)
    .set("Authorization", `Bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const newBlogPostFromResponse = response.body[2];

  assert.strictEqual(newBlogPostFromResponse.likes, 0);
});

test.describe("that missing title and author give bad request and message test suite", async () => {
  const blogWithMissingTitleAndAuthor = {
    likes: 0,
  };

  const blogWithMissingTitle = {
    author: "author",
    likes: 0,
  };

  const blogWithMissingAuthor = {
    title: "title",
    likes: 0,
  };

  test("that missing title and author give bad requests and message", async () => {
    const token = await helper.generateToken();

    const response = await api
      .post("/api/blogs")
      .send(blogWithMissingTitleAndAuthor)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /text\/html/);

    assert.strictEqual(response.text, "author and title are missing");
  });

  test("that missing author give bad request and message", async () => {
    const token = await helper.generateToken();

    const response = await api
      .post("/api/blogs")
      .send(blogWithMissingAuthor)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /text\/html/);

    assert.strictEqual(response.text, "author is missing");
  });

  test("that missing title give bad request and message", async () => {
    const token = await helper.generateToken();

    const response = await api
      .post("/api/blogs")
      .send(blogWithMissingTitle)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /text\/html/);

    assert.strictEqual(response.text, "no title");
  });
});

describe("deleting tests", () => {
  test("that deleting test successfully gives 204 bad request", async () => {
    const userResponse = await api.get("/api/users").expect(200);

    let firstBlogIdObject;
    try {
      firstBlogIdObject = await helper.getFirstBlogId();
    } catch (e) {
      assert.fail(e.message);
    }
    const firstBlogId = firstBlogIdObject.toString();
    const loginResponse = await api
      .post(`/api/login/`)
      .send(helper.rootUserInfo)
      .expect(200);

    const token = loginResponse.body.token;
    const deleteResponse = await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const initialBlogs = await helper.getInitialBlogs();
    const blogsAfterDeletion = await helper.blogsInDb();
    assert.strictEqual(blogsAfterDeletion.length, initialBlogs.length - 1);
  });

  test("that non-existent id causes 400 error", async () => {
    const loginResponse = await api
      .post(`/api/login/`)
      .send(helper.rootUserInfo)
      .expect(200);

    const token = loginResponse.body.token;

    await api
      .delete(`/api/blogs/${helper.nonExistingId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test.only("that no id returns 400", async () => {
    await api.delete("/api/blogs").expect(404);
  });
});

describe("updating test", () => {
  test("that updating a blog replaces content", async () => {
    const firstBlogId = await helper.getFirstBlogId();
    const response = await api
      .put(`/api/blogs/${firstBlogId}`)
      .send(helper.updatedBlogOne)
      .expect(200)
      .expect("Content-Type", /text\/html/);
    assert.strictEqual(response.text, "blog updated correctly");
  });

  test("no blog found with id", async () => {
    const response = await api
      .put(`/api/blogs/${helper.nonExistingId}`)
      .expect(404);

    assert.strictEqual(response.text, "no blog found");
  });
});

after(async () => {
  console.log("closing connection");
  await mongoose.connection.close();
  console.log("connection closed");
});
