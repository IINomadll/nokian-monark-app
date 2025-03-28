const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", (request, response) => {
  const { username, password } = request.body;

  User.findOne({ username })
    .then((user) => {
      if (!user)
        return response
          .status(401) // unauthorized
          .json({ error: "invalid username or password" });

      return bcrypt
        .compare(password, user.passwordHash)
        .then((passwordCorrect) => {
          if (!passwordCorrect)
            return response
              .status(401)
              .json({ error: "invalid username or password" });

          const userForToken = {
            username: user.username,
            id: user._id,
          };

          const token = jwt.sign(userForToken, config.SECRET);

          response.status(200).send({ token, username: user.username });
        });
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json({ error: "internal server error" });
    });
});

module.exports = loginRouter;
