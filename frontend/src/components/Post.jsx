import { useState } from "react";
import { toast } from "react-toastify";
import postService from "../services/posts";
import EditPostForm from "./EditPostForm";

const Post = ({ post, posts, setPosts }) => {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (updatedPost) => {
    postService
      .update(post.id, updatedPost)
      .then((response) => {
        const updatedPosts = posts.map((p) =>
          p.id !== post.id ? p : response.data
        );
        setPosts(updatedPosts);
        toast.success("Post updated!");
        setEditing(false);
      })
      .catch((error) => {
        console.error("update failed", error);
        toast.error("Update operation failed!");
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete: "${post.title}"?`
    );
    if (!confirmDelete) {
      console.log("delete action cancelled");
      toast.info("Delete operation cancelled!");
      return;
    }

    postService
      .eradicate(post.id)
      .then(() => {
        setPosts(posts.filter((p) => p.id !== post.id));
        toast.success("Post deleted!");
      })
      .catch((error) => {
        console.error("Delete failed", error);
        toast.error("Delete operation failed!");
      });
  };

  return (
    <li>
      {editing ? (
        <EditPostForm
          post={post}
          onUpdate={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <article className="post" aria-labelledby={`post-${post.id}-title`}>
          <h3 id={`post-${post.id}-title`}>{post.title}</h3>
          <p>{post.content}</p>
          <div className="post-actions">
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </article>
      )}
    </li>
  );
};

export default Post;
