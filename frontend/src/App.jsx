import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import postService from "./services/posts";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import News from "./pages/News";
import Band from "./pages/Band";
import Contact from "./pages/Contact";
import Music from "./pages/Music";

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
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News posts={posts} />} />
        <Route path="/band" element={<Band />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/music" element={<Music />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
