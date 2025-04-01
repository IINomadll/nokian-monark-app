import { Link } from "react-router-dom";

const NavigationBar = () => {
  const padding = {
    paddingRight: 5,
  };

  // selvitä, onko parempi käyttää id:tä vai classname:a
  return (
    <header>
      <nav aria-label="primary-navigation">
        <Link to="/" style={padding}>
          Home
        </Link>
        <Link to="/news" style={padding}>
          News
        </Link>
        <Link to="/music" style={padding}>
          Music
        </Link>
        <Link to="/shop" style={padding}>
          Shop
        </Link>
        <Link to="/band" style={padding}>
          Band
        </Link>
        <Link to="/contact" style={padding}>
          Contact
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
