import { useState, useEffect } from "react";
import postService from "./services/posts";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("effect");
    //prettier-ignore
    postService
      .getAll()
      .then((response) => {
        console.log("promise fulfilled");
        setPosts(response.data)
      })
      .catch((error) => {
        console.log("caught error:", error)
      })
  }, []);

  return (
    <div>
      <h1>Home view of Nøkian Monark web application</h1>
      <h2>Posts from backend</h2>
      {posts.map((post) => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  );
};

export default App;
