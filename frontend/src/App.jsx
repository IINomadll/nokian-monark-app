import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import postService from "./services/posts";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import About from "./pages/About";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("effect ran");
    postService
      .getAll()
      .then((response) => {
        console.log("promise fulfilled");
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("promise rejected");
        console.error("caught error:", error);
      });
  }, []);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
