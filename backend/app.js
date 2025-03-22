const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./controllers/posts");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

console.log("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>hello from backend</h1>");
});

app.use("/api/posts", postsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.myErrorHandler);

module.exports = app;
