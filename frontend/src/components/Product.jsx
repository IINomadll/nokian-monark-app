import { useState } from "react";

import "../styles/Product.css";

const Product = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = product.sizes
    ? product.sizes[selectedSize] || 0
    : product.quantity || 0;

  // calculate total stock correctly across all sizes
  const totalStock = product.sizes
    ? Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0)
    : product.quantity || 0;

  // used to disable actions until a valid size is selected
  const sizeNotSelected = product.sizes && !selectedSize;
  // used for robust check of out-of-stock products
  const isOutOfStock = totalStock === 0 || !product.available;
  // used to enable/disable the "Add to cart" button and gatekeep handleAdd
  const canAdd = product.available && !sizeNotSelected && quantity >= 1;

  const handleAdd = () => {
    if (!canAdd) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      available: product.available,
      maxQuantity,
      quantity,
      ...(selectedSize && { selectedSize }),
    };

    onAddToCart(cartItem);
    setSelectedSize("");
    setQuantity(1);
  };

  return (
    <article className="product" aria-labelledby={`product-${product.id}-name`}>
      <header>
        <h3 id={`product-${product.id}-name`}>{product.name}</h3>
        <p>
          <em>{product.description}</em>
        </p>
      </header>

      <figure>
        <img
          src={product.imageUrl}
          alt={`Image of ${product.name}`}
          style={{ width: "15rem", borderRadius: 4 }}
        />
      </figure>

      <section>
        <p>
          <strong>Price:</strong> {product.price} €
        </p>

        {product.material && (
          <p>
            <strong>Material:</strong> {product.material}
          </p>
        )}

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        {!product.available && (
          <p>
            <strong>Out of stock</strong>
          </p>
        )}

        {!isOutOfStock && (
          <>
            {product.sizes ? (
              <div>
                <label htmlFor={`size-select-${product.id}`}>
                  <strong>Select size: </strong>
                </label>
                <select
                  id={`size-select-${product.id}`}
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    setQuantity(1);
                  }}
                >
                  <option value="">--- Choose size ---</option>
                  {Object.entries(product.sizes).map(([size, qty]) => (
                    <option key={size} value={size} disabled={qty === 0}>
                      {size} ({qty} in stock)
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>
                <strong>In stock:</strong> {product.quantity}
              </p>
            )}

            <div style={{ marginTop: "1rem" }}>
              <label htmlFor={`qty-${product.id}`}>
                <strong>Quantity: </strong>
              </label>
              <div
                id={`qty-${product.id}`}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={sizeNotSelected}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((prev) => Math.min(maxQuantity, prev + 1))
                  }
                  disabled={sizeNotSelected}
                >
                  +
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {!isOutOfStock && (
        <footer style={{ marginTop: "1rem" }}>
          <button
            type="button"
            aria-label="Add product to cart"
            onClick={handleAdd}
            disabled={!canAdd}
          >
            Add to cart
          </button>
        </footer>
      )}
    </article>
  );
};

export default Product;
