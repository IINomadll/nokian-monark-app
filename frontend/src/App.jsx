import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import postService from "./services/posts";
import getSecret from "./services/secret";
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
  const [adminSecret, setAdminSecret] = useState(null);

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

  useEffect(() => {
    console.log("second effect ran");
    getSecret()
      .then((response) => {
        console.log("second promise fulfilled");
        setAdminSecret(response.data.secret);
      })
      .catch((error) => {
        console.log("promise rejected");
        console.error("caught error:", error);
      });
  }, []);

  // app first renders "Loading...", and when the state changes (adminSecret arrives from backend) app re-renders and returns actual content
  if (!adminSecret) return <div>Loading...</div>;

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
        {adminSecret && <Route path={`/${adminSecret}`} element={<Login />} />}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
