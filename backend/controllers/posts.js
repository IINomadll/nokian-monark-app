const postsRouter = require("express").Router();
const Post = require("../models/post");

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

postsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const newPost = new Post({
    content: body.content,
    created: Date.now(),
  });

  newPost
    .save()
    .then((savedPost) => {
      response.json(savedPost);
    })
    .catch((error) => next(error));
});

postsRouter.put("/:id", (request, response, next) => {
  const { content } = request.body;

  Post.findById(request.params.id)
    .then((post) => {
      if (!post) return response.status(404).end();

      post.content = content;

      return post.save().then((updatedPost) => {
        response.json(updatedPost);
      });
    })
    .catch((error) => next(error));
});

postsRouter.delete("/:id", (request, response, next) => {
  Post.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = postsRouter;
