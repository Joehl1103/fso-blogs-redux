const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogsController");
const usersRouter = require("./controllers/usersController");
const loginRouter = require("./controllers/loginController");
const commentsRouter = require('./controllers/commentController')
const middleware = require("./utils/middleware");

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
];

const envAllowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);
const allowVercelPreviews = process.env.CORS_ALLOW_VERCEL_PREVIEWS === "true";

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.has(origin)) return cb(null, true);
      if (allowVercelPreviews && origin.endsWith(".vercel.app")) {
        return cb(null, true);
      }
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
  }),
);

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
