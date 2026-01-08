const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  console.log("password", password);
  console.log("password length:", password.length);
  // password validation
  if (password.length < 3) {
    console.log("password too short");
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }
  const passwordValidation = validatePassword(password);
  if (!passwordValidation) {
    console.log("password validation failed");
    return response
      .status(400)
      .json({
        error:
          "Password must contain at least 1 upper case letter, 1 lower case, and 1 symbol: !@#$%&*",
      });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  console.log("saving");
  const savedUser = await user.save();
  console.log("saved");

  return response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const blogs = await User.find({}).populate("blogs", { title: 1, author: 1 });
  response.status(200).json(blogs);
});

usersRouter.delete("/:id", async (request, response) => {
  console.log(request.params.id);
  const id = request.params.id;
  await User.deleteOne({ _id: id });
  return response.status(204).send("user successfully deleted");
});

function validatePassword(password) {
  return (validated = /^(?=.*[A-Z])(?=.*[\d])(?=.*[!*@#$%&]).*$/.test(
    password,
  ));
}

module.exports = usersRouter;
