const router = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", (request, response) => {
  response.json({ message: "Testing endpoint is working! Use POST /api/testing/reset to reset the database." });
});

router.post("/reset", async (request, response) => {
  console.log("ENTERING RESET");
  await User.deleteMany({});
  console.log("DELETED USERS");
  await Blog.deleteMany({});
  console.log("DELETED BLOGS");
  response.status(204).end();
});

module.exports = router;
