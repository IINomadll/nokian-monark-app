import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { ACTIONS } from "../context/CartContext";

const CheckoutResult = () => {
  const { dispatch } = useCart();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("success") === "true") {
      dispatch({ type: ACTIONS.CLEAR_CART });
    }
  }, [location.search, dispatch]);

  return (
    <section className="page">
      <h1>Thank you for your order!</h1>
      <p>
        Your order was placed successfully. You will soon receive an email
        confirmation.
      </p>
    </section>
  );
};

export default CheckoutResult;
