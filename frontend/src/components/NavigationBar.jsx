import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

import "../styles/NavigationBar.css";

const NavigationBar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="nav-header">
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

          {totalItems > 0 && (
            <li className="nav-item cart-link">
              <Link to="/cart-summary">
                🛒<span className="cart-badge">{totalItems}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
