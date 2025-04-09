import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import userService from "../utils/userService";
import postService from "../services/posts";
import NewsForm from "../components/NewsForm";
import NewsPost from "../components/NewsPost";

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
              <NewsPost
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
              />
            ))}
          </ul>
          <NewsForm posts={posts} setPosts={setPosts} />
        </section>
      </section>
    </>
  );
};

export default AdminPanel;
