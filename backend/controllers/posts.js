const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const { tokenExtractor, authenticateUser } = require("../utils/middleware");

const postsRouter = require("express").Router();

// apply token extractor middleware to all requests
postsRouter.use(tokenExtractor);

postsRouter.get("/", (request, response) => {
  Post.find({}).then((posts) => {
    response.json(posts);
  });
});

postsRouter.get("/:id", (request, response, next) => {
  Post.findById(request.params.id)
    .then((post) => {
      if (post) response.json(post);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

postsRouter.post("/", authenticateUser, (request, response, next) => {
  const body = request.body;

  const newPost = new Post({
    title: body.title,
    content: body.content,
    created: Date.now(),
  });

  newPost
    .save()
    .then((savedPost) => response.json(savedPost))
    .catch((error) => next(error));
});

postsRouter.put("/:id", authenticateUser, (request, response, next) => {
  const { title, content } = request.body;

  Post.findById(request.params.id)
    .then((post) => {
      if (!post) return response.status(404).end();

      post.title = title;
      post.content = content;

      return post.save().then((updatedPost) => {
        response.json(updatedPost);
      });
    })
    .catch((error) => next(error));
});

postsRouter.delete("/:id", authenticateUser, (request, response, next) => {
  Post.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = postsRouter;
