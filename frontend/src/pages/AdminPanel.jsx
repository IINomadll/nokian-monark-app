import { useNavigate, Navigate } from "react-router-dom";

import userService from "../utils/userService";
import postService from "../services/posts";
import NewsForm from "../components/NewsForm";

const AdminPanel = ({ user, setUser, posts, setPosts }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userService.remove();
    setUser(null);
    console.log("admin logged out");
    navigate("/");
  };

  const handleEdit = () => {
    console.log("implement editing a post as a next step!");
  };

  const handleDelete = (post) => {
    const choice = window.confirm(
      `Are your sure you want to delete post titled: ${post.title}?`
    );
    if (choice) {
      postService.setToken(user.token);
      postService
        .eradicate(post.id)
        .then((response) => {
          console.log(response);
          setPosts(posts.filter((p) => p.id !== post.id));
        })
        .catch((error) =>
          console.error("error occured while deleting the post", error)
        );
    } else {
      console.log("delete action cancelled");
    }
  };

  if (!user) {
    // If user is not authenticated, redirect to home
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>Admin panel</h1>
      <section>
        <p>
          Logged in as <strong>{user.username}</strong>
        </p>
        <button onClick={handleLogout}>Logout</button>
        <hr />
        <section>
          <h2>Band news posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => handleDelete(post)}>Delete</button>
              </li>
            ))}
          </ul>
          <NewsForm user={user} posts={posts} setPosts={setPosts} />
        </section>
      </section>
    </>
  );
};

export default AdminPanel;
