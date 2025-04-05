import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import postService from "./services/posts";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import News from "./pages/News";
import Band from "./pages/Band";
import Contact from "./pages/Contact";
import Music from "./pages/Music";
import Shop from "./pages/Shop";
import Login from "./pages/Login";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [adminAccess, setAdminAccess] = useState(false);

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

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News posts={posts} />} />
        <Route path="/band" element={<Band />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/music" element={<Music />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/administrate/:uuid"
          element={
            <Login adminAccess={adminAccess} setAdminAccess={setAdminAccess} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
