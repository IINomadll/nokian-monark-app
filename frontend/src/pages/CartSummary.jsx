import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { ACTIONS } from "../context/CartContext";

import "../styles/CartSummary.css";

const CartSummary = () => {
  const { cart, dispatch } = useCart();
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setTotalProducts(
      cart.reduce((totalItems, item) => totalItems + 1 * item.quantity, 0)
    );
  }, [cart]);

  console.log("total items in cart:", totalProducts);

  if (cart.length > 0) console.log("cart state:", cart);

  const handleUpdateQuantity = (id, newQuantity, selectedSize) => {
    dispatch({
      type: ACTIONS.UPDATE_ITEM_QUANTITY,
      payload: { id, quantity: newQuantity, selectedSize },
    });
  };

  const handleDeleteItem = (id, selectedSize) => {
    dispatch({
      type: ACTIONS.DELETE_ITEM,
      payload: { id, selectedSize },
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
              const {
                id,
                name,
                price,
                quantity,
                maxQuantity,
                selectedSize,
                imageUrl,
              } = item;

              return (
                <li
                  className="cart-item"
                  key={`${id}-${selectedSize || "no-size"}`}
                >
                  <figure>
                    <img
                      src={imageUrl}
                      alt={`Image of ${name}`}
                      // style={{ width: "5rem", borderRadius: 4 }}
                    />
                  </figure>

                  <p>
                    <strong>{name}</strong>
                    {selectedSize && <span> - Size: {selectedSize}</span>}
                  </p>

                  <div className="quantity-div">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        handleUpdateQuantity(
                          id,
                          Math.max(1, quantity - 1),
                          selectedSize
                        )
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
                          Math.min(maxQuantity, quantity + 1),
                          selectedSize
                        )
                      }
                    >
                      +
                    </button>

                    <div className="price-div">
                      {quantity === 1 && <span> x {price} €</span>}

                      {quantity > 1 && (
                        <span>
                          {" "}
                          x {price} € ={" "}
                          <strong>{(quantity * price).toFixed(2)} €</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className="remove-button"
                    type="button"
                    aria-label="Remove item from cart"
                    onClick={() => handleDeleteItem(id, selectedSize)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {cart.length > 0 && (
        <section>
          <h2>
            <strong>
              {String(totalProducts)} products, total price:{" "}
              {getTotalPrice().toFixed(2)} €
            </strong>
          </h2>
        </section>
      )}
    </article>
  );
};

export default CartSummary;
