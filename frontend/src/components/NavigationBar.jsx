import { Link } from "react-router-dom";

const NavigationBar = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <header className="navHeader">
      <nav>
        <Link to="/" style={padding}>
          Home
        </Link>
        <Link to="/posts" style={padding}>
          Posts
        </Link>
        <Link to="/about" style={padding}>
          About
        </Link>
      </nav>
    </header>
  );
};

/* tämä oli react dinerin tyyli, mitä etuja tässä?
<header className="navHeader">
  <nav>
    <ul className="list">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
</header>
*/

export default NavigationBar;
