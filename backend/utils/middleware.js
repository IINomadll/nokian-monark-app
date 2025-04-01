const jwt = require("jsonwebtoken");
const config = require("./config");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next(); // pass request to the next middleware
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer "))
    request.token = authorization.replace("Bearer ", "");
  else request.token = null;

  next(); // pass request to the next middleware
};

// const tokenExtractor = (request, response, next) => {
//   const authorization = request.get("authorization");

//   if (authorization && authorization.startsWith("Bearer ")) {
//     request.token = authorization.replace("Bearer ", "");
//   } else {
//     request.token = null;
//   }

//   next();
// };

const authenticateUser = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);

  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });

  request.user = decodedToken;
  next(); // pass request to the protected route handler
};

const myErrorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }
  next(error); // pass error to default Express error handler
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  authenticateUser,
  myErrorHandler,
};
