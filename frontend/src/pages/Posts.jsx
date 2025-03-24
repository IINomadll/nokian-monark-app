const Posts = ({ posts }) => {
  return (
    <>
      <h2>Posts from backend</h2>
      <div className="postsdiv">
        {posts.map((post) => (
          <p key={post.id}>{post.content}</p>
        ))}
      </div>
    </>
  );
};

export default Posts;
