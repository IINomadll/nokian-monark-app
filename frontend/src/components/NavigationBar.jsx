import { Link } from "react-router-dom";

const NavigationBar = () => {
  // selvitä, onko parempi käyttää id:tä vai classname:a
  return (
    <header>
      <nav aria-label="primary-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>

          {/* <Link to="/news" style={padding}>
          News
        </Link> */}

          <li className="nav-item">
            <Link to="/music">Music</Link>
          </li>

          <li className="nav-item">
            <Link to="/shop">Shop</Link>
          </li>

          <li className="nav-item">
            <Link to="/band">Band</Link>
          </li>

          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
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
