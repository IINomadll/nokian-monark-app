import { useState, useEffect } from "react";

const EditPostForm = ({ post, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  // side effect for closing the edit form with "Esc"
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      // clean up on component unmount
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [onCancel]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPost = {
      ...post,
      title,
      content,
    };
    onUpdate(updatedPost);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit post</legend>
          <p>
            <label htmlFor="title">Post title:</label>
            <br />
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={({ target }) => setTitle(target.value)}
            />
          </p>
          <p>
            <label htmlFor="content">Post content:</label>
            <br />
            <textarea
              id="content"
              rows={10}
              cols={70}
              value={content}
              required
              onChange={({ target }) => setContent(target.value)}
            />
          </p>
          <button type="submit">Save changes</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default EditPostForm;
