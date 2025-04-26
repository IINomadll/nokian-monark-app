import { useState } from "react";

const QuantityButtons = ({ qty }) => {
  const [quantity, setQuantity] = useState(qty);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQuantity((prev) => Math.min(1, prev - 1))}
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButtons;
