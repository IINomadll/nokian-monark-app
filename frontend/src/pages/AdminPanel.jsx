import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import userService from "../utils/userService";
import postService from "../services/posts";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import BackToTopButton from "../components/BackToTopButton";

const AdminPanel = ({ user, setUser, posts, setPosts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminPanel token effect ran");
    postService.setToken(user.token);
  }, [user]);

  const handleLogout = () => {
    userService.remove();
    setUser(null);
    console.log("admin logged out");
    navigate("/");
    toast.info("Logged out!");
  };

  if (!user) {
    // If user is not authenticated, redirect to home
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>Admin panel</h1>
      <article id="adminPanel">
        <section>
          <p>
            Logged in as <strong>{user.username}</strong>
          </p>
          <button onClick={handleLogout}>Logout</button>
        </section>
        <hr />
        <article id="posts">
          <h2>Manage news posts</h2>
          <ul>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
              />
            ))}
          </ul>
          <PostForm posts={posts} setPosts={setPosts} />
        </article>
        <br />
        <hr />
        <article id="shopInventory">
          <h2>Manage shop inventory</h2>
        </article>
        <br />
        <BackToTopButton />
      </article>
    </>
  );
};

export default AdminPanel;
