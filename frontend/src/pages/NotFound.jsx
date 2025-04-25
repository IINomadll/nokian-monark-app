import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <article className="page">
      <header>
        <h1>404 - Page not found</h1>
        <p>
          Oops, something went wrong <strong>or</strong> page doesn't exist
        </p>
      </header>

      <button type="button" onClick={() => navigate("/")}>
        Return to home
      </button>
    </article>
  );
};

export default NotFound;
