import { useCart } from "../hooks/useCart";
import Product from "../components/Product";
import { ACTIONS } from "../context/CartContext";

const Shop = ({ products }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { product } });
  };

  return (
    <article className="shop-page">
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
    </article>
  );
};

export default Shop;
