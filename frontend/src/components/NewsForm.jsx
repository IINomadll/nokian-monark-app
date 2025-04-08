import { useState } from "react";

import postService from "../services/posts";

const NewsForm = ({ user, posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = (event) => {
    event.preventDefault();
    const postObj = {
      title,
      content,
    };
    postService.setToken(user.token);
    postService
      .create(postObj)
      .then((response) => {
        console.log(response);
        setPosts(posts.concat(response.data));
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error("Adding post failed", error));
  };

  return (
    <>
      <form onSubmit={handleAddPost}>
        <fieldset>
          <legend>Create new post</legend>
          <p>
            <label htmlFor="title">Post title:</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </p>
          <p>
            <label htmlFor="content">Post text content:</label>
            <br />
            <textarea
              type="text"
              name="content"
              id="content"
              cols={70}
              rows={10}
              required
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
          </p>
          <button type="submit">Create post</button>
        </fieldset>
      </form>
    </>
  );
};

export default NewsForm;
