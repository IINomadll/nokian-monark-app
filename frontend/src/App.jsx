import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import postService from "./services/posts";
import userService from "./utils/userService";

import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import News from "./pages/News";
import Band from "./pages/Band";
import Contact from "./pages/Contact";
import Music from "./pages/Music";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const [posts, setPosts] = useState([]);
  // const [adminAccess, setAdminAccess] = useState(false);
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
        console.log("promise rejected");
        console.error("caught error:", error);
      });
  }, []);

  // session storage user effect
  useEffect(() => {
    const storedUser = userService.load();
    if (storedUser) {
      setUser(storedUser);
      // postService.setToken(storedUser.token);
    }
  }, []);

  // sorts posts in descending order (newest first)
  // while maintaining immutability of original posts array
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News posts={sortedPosts} />} />
        <Route path="/band" element={<Band />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/music" element={<Music />} />
        <Route path="/shop" element={<Shop />} />
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
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
