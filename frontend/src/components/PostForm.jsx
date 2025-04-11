import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import postService from "../services/posts";

const PostForm = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = (event) => {
    event.preventDefault();
    const postObj = {
      title,
      content,
    };
    postService
      .create(postObj)
      .then((response) => {
        console.log(response);
        setPosts(posts.concat(response.data));
        setTitle("");
        setContent("");
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Post created!");
      })
      .catch((error) => {
        console.error("adding post failed", error);
        toast.error("Post creation failed!");
      });
  };

  return (
    <>
      <form onSubmit={handleAddPost}>
        <fieldset>
          <legend>Create a news post</legend>
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
            <label htmlFor="content">Post content:</label>
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

export default PostForm;
