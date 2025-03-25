const Posts = ({ posts }) => {
  return (
    <section>
      <h1>Posts from backend</h1>
      <div>
        {posts.map((post) => (
          <p key={post.id}>{post.content}</p>
        ))}
      </div>
    </section>
  );
};

export default Posts;
