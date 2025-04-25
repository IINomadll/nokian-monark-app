import BackToTopButton from "../components/BackToTopButton";

const Home = ({ posts }) => {
  return (
    <article className="page">
      <header>
        <h1>Nøkian Monark App</h1>
        <p>Welcome to the main page</p>
      </header>

      <section>
        <h2>Band news</h2>
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

      <footer>
        <BackToTopButton />
      </footer>
    </article>
  );
};

export default Home;
