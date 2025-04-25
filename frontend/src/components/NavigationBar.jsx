import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const NavigationBar = () => {
  const { cart } = useCart();

  return (
    <header>
      <nav aria-label="primary-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>

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

          {cart.length > 0 && (
            <li className="nav-item">
              <Link to="/cart-summary">🛒</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
