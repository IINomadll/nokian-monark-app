import BackToTopButton from "../components/BackToTopButton";

const Home = ({ posts }) => {
  return (
    <article className="home">
      <header>
        <h1>Nøkian Monark App</h1>
        <p>Welcome to the main page</p>
      </header>

      <section aria-labelledby="news-posts">
        <h2 id="news-posts">Band news</h2>
        <ol>
          {posts.map((post) => (
            <li key={post.id}>
              <article>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>
      <BackToTopButton />
    </article>
  );
};

export default Home;
