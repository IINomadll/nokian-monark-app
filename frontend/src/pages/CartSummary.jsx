import { useCart } from "../hooks/useCart";
import { ACTIONS } from "../context/CartContext";

const CartSummary = () => {
  const { cart, dispatch } = useCart();

  if (cart.length > 0) console.log("cart state:", cart);

  const handleUpdateQuantity = (id, newQuantity) => {
    dispatch({
      type: ACTIONS.UPDATE_ITEM_QUANTITY,
      payload: { id, quantity: newQuantity },
    });
  };

  const handleDeleteItem = (id) => {
    dispatch({
      type: ACTIONS.DELETE_ITEM,
      payload: id,
    });
  };

  return (
    <article className="page">
      <header>
        <h1>Shopping cart</h1>
      </header>

      <section className="shopping-cart">
        {cart.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => {
              const { id, name, price, quantity, maxQuantity, selectedSize } =
                item;

              return (
                <li
                  className="cart-item"
                  key={`${id}-${selectedSize || "no-size"}`}
                >
                  <p>
                    <strong>{name}</strong>
                    {selectedSize && <span> - Size: {selectedSize}</span>}
                  </p>

                  <p>{price} €</p>

                  <div className="quantity-div">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        handleUpdateQuantity(id, Math.max(1, quantity - 1))
                      }
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        handleUpdateQuantity(
                          id,
                          Math.min(maxQuantity, quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="Remove item from cart"
                    onClick={() => handleDeleteItem(id)}
                  >
                    🗑️
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </article>
  );
};

export default CartSummary;
