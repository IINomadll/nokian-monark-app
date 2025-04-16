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
    <section aria-labelledby={`edit-post-${post.id}-heading`}>
      <h3 id={`edit-post-${post.id}-heading`}>Edit Post</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit post</legend>

          <div className="form-field">
            <label htmlFor="title">Post title:</label>
            <br />
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div className="form-field">
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
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit">Save changes</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
