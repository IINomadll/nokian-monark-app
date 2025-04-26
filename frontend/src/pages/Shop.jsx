import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";
import { ACTIONS } from "../context/CartContext";

import Product from "../components/Product";
import BackToTopButton from "../components/BackToTopButton";

const Shop = ({ products }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (cartItem) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: cartItem });
    toast.success(`${cartItem.name} added to cart!`);
  };

  return (
    <article className="page">
      <header>
        <h1>Shop</h1>
      </header>

      <section className="shop-grid">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </section>

      <footer>
        <BackToTopButton />
      </footer>
    </article>
  );
};

export default Shop;
