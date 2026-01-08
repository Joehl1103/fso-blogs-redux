const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogsController");
const usersRouter = require("./controllers/usersController");
const loginRouter = require("./controllers/loginController");
const commentsRouter = require('./controllers/commentController')
const middleware = require("./utils/middleware");

const app = express();

const dbConnect = mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log(`Connected to database at url ${config.MONGODB_URI}`);
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  });

app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use('/api/comments', commentsRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testingController");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

module.exports = { app, dbConnect };
