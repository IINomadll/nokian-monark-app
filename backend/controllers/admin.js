const adminRouter = require("express").Router();
const { ADMIN_UUID } = require("../utils/config");

adminRouter.post("/verify", (request, response) => {
  const uuid = request.body.uuid?.trim();

  if (uuid === ADMIN_UUID) return response.json({ valid: true });
  else
    return response.status(403).json({ valid: false, error: "invalid UUID" });
});

module.exports = adminRouter;
