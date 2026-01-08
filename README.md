# Blog List Application

A full-stack blog platform built with React, Redux Toolkit, and Express. Users can create accounts, publish blogs, like posts, and leave comments.

## Tech Stack

**Frontend:**
- React 18
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Vitest + Testing Library

**Backend:**
- Express 5
- MongoDB / Mongoose
- JWT Authentication
- bcrypt

**E2E Testing:**
- Playwright

## Project Structure

```
blog-list-redux/
├── backend/           # Express API server
│   ├── controllers/   # Route handlers
│   ├── models/        # Mongoose schemas (Blog, User, Comment)
│   ├── tests/         # API tests (Supertest)
│   └── utils/         # Config, middleware
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── reducers/  # Redux slices
│   │   └── services/  # API clients
└── playwright-testing/  # E2E tests
```

## Features

- User registration and login with JWT
- Create, read, update, delete blogs
- Like blogs
- Comment on blogs
- View all users and their blogs
- Sorted blog display (by likes)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
TEST_MONGODB_URI=your_test_mongodb_connection_string
SECRET=your_jwt_secret
PORT=3003
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to the backend.

### Running Tests

**Backend API tests:**
```bash
cd backend
npm test
```

**Frontend unit tests:**
```bash
cd frontend
npm test
```

**E2E tests:**
```bash
cd playwright-testing
npm install
npx playwright test
```

## API Endpoints

- `POST /api/login` - Authenticate user
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/blogs` - List all blogs
- `POST /api/blogs` - Create blog (auth required)
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog (auth required, owner only)
- `GET /api/blogs/:id/comments` - Get comments for a blog
- `POST /api/blogs/:id/comments` - Add comment to a blog

## Built as part of

[Full Stack Open](https://fullstackopen.com/) - University of Helsinki
