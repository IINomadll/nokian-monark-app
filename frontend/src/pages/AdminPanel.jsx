import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import userService from "../utils/userService";
import tokenService from "../services/token";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import Product from "../components/Product";
import BackToTopButton from "../components/BackToTopButton";

const AdminPanel = ({
  user,
  setUser,
  posts,
  setPosts,
  products,
  setProducts,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminPanel token effect ran");
    tokenService.setToken(user.token);
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
      <header>
        <h1>Admin panel</h1>
        <div>
          <p>
            Logged in as <strong>{user.username}</strong>
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* main content of page starts here */}
      <main>
        <section>
          <h2>Manage news posts</h2>
          <ol>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
              />
            ))}
          </ol>
          <PostForm posts={posts} setPosts={setPosts} />
        </section>

        <section>
          <h2>Manage products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                products={products}
                setProducts={setProducts}
              />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <BackToTopButton />
      </footer>
    </>
  );
};

export default AdminPanel;
