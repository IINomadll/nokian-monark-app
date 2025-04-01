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

      // 'return' ensures that the Promise from bcrypt.compare is returned to the outer .then() chain. This allows any errors occurring during the password comparison to be properly caught by the .catch() block at the end.
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

          // valid tokens can be generated only with the secret that is used in the digital signing. Token is set to expire in 120 * 60 seconds (two hours)
          const token = jwt.sign(userForToken, config.SECRET, {
            expiresIn: 120 * 60,
          });

          response.status(200).send({ token, username: user.username });
        });
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json({ error: "internal server error" });
    });
});

module.exports = loginRouter;
