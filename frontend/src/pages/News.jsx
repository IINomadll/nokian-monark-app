const News = ({ posts }) => {
  return (
    <>
      <h1>Band news</h1>
      <section>
        <h2>Posts from backend</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default News;
