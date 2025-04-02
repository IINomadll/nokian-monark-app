const secretRouter = require("express").Router();
const { ADMIN_SECRET_ID } = require("../utils/config");

secretRouter.get("/", (request, response) => {
  response.json({ secret: ADMIN_SECRET_ID });
});

module.exports = secretRouter;
