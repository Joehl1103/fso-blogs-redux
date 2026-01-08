const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const helper = require("../tests/test_helper");
const blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.status(200).json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  console.log("ENTERING BLOGS POST");

  let body = request.body;
  console.log("body in post", body);
  const user = request.user;
  if (!user) {
    console.log("user is missing");
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  if (!body.author && !body.title) {
    console.log("no author and title");
    response.status(400).send("author and title are missing");
    return;
  } else if (!body.author && body.title) {
    console.log("no author");
    response.status(400).send("author is missing");
    return;
  } else if (body.author && !body.title) {
    console.log("no title");
    response.status(400).send("no title");
    return;
  }
  if (!body.likes) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  if (savedBlog) {
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    console.log("params", request.params);
    const blogId = request.params.id;
    if (!blogId) {
      console.log("no id");
      return response.status(400).send("id not found in request");
    }
    console.log("blogid ok. hitting findById");
    let blogToBeDeleted;
    try {
      blogToBeDeleted = await Blog.findById(blogId);
    } catch (e) {
      console.log(`Error deleting blog: ${e.message}`);
      return response.status(500).json({ Error: e.message });
    }
    if (!blogToBeDeleted) {
      console.log("no blog to be deleted");
      return response.status(404).send("no blog found");
    }
    const userId = request.user._id.toString();
    // console.log(`userId if of type ${typeof userId}: ${userId}`)
    // console.log(`blogToBeDeleted user id is of type ${typeof blogToBeDeleted.user}`)

    if (userId !== blogToBeDeleted.user.toString()) {
      console.log(
        `user id ${user} is NOT equal to blog user ${blogToBeDeleted.user} `,
      );
      return response
        .status(400)
        .json({
          Error:
            "`user id ${user} is NOT equal to blog user ${blogToBeDeleted.user} `",
        });
    }
    const blogUser = blogToBeDeleted.user.toString();
    console.log("blogToBeDeleted", blogToBeDeleted);
    console.log("blogUser", blogUser);
    try {
      await Blog.deleteOne({ _id: blogId });
      console.log("succesfully deleted!");
      return response.status(204).send("blog successfully deleted");
    } catch (e) {
      return response.status(500).json({ error: "error while deleting" });
    }
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blogToBeUpdated = await Blog.findById(id);
  if (!blogToBeUpdated) {
    response.status(404).send("no blog found");
    return;
  }
  const blogToBeUpdatedId = blogToBeUpdated._id;
  await Blog.findByIdAndUpdate(blogToBeUpdatedId, body);
  response.status(200).send("blog updated correctly");
});

module.exports = blogsRouter;
