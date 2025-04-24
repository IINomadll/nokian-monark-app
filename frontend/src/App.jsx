import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import postService from "./services/posts";
import productService from "./services/products";
import userService from "./utils/userService";

import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoute from "./components/ProtectedRoute";

// import News from "./pages/News";
import Home from "./pages/Home";
import Band from "./pages/Band";
import Contact from "./pages/Contact";
import Music from "./pages/Music";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

import CartProvider from "./context/CartContext";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  // posts effect
  useEffect(() => {
    console.log("posts effect ran");
    postService
      .getAll()
      .then((response) => {
        console.log("posts promise fulfilled");
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("posts promise rejected");
        console.error("caught error:", error);
      });
  }, []);

  // products effect
  useEffect(() => {
    console.log("products effect ran");
    productService
      .getAll()
      .then((response) => {
        console.log("products promise fulfilled");
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("products promise rejected");
        console.error("caught error:", error);
      });
  }, []);

  // session storage user effect
  useEffect(() => {
    const storedUser = userService.load();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // sorts posts in descending order (newest first)
  // while maintaining immutability of original posts array
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <CartProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home posts={sortedPosts} />} />
        {/* <Route path="/news" element={<News posts={sortedPosts} />} /> */}
        <Route path="/band" element={<Band />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/music" element={<Music />} />
        <Route path="/shop" element={<Shop products={products} />} />
        <Route
          path="/administrate/:uuid"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/administrate/panel"
          element={
            <ProtectedRoute user={user}>
              <AdminPanel
                user={user}
                setUser={setUser}
                posts={sortedPosts}
                setPosts={setPosts}
                products={products}
                setProducts={setProducts}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
      <Footer />
    </CartProvider>
  );
};

export default App;
