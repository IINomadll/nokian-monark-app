import { useState } from "react";
import { toast } from "react-toastify";

import EditProductForm from "./EditProductForm";

const Product = ({ product, products, setProducts }) => {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (updatedProduct) => {
    console.log("handleUpdate called!");
    const updatedProductList = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProductList);
    setEditing(false); // auto close form on save
    toast.success("Product updated!");
  };

  return (
    <>
      <li>
        <h3>{product.name}</h3>
        <p>
          <em>{product.description}</em>
        </p>
        <figure>
          <img
            src={product.imageUrl}
            alt={`Image of ${product.name}`}
            style={{ width: "15rem" }}
          />
        </figure>
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

        {product.quantity != null ? (
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
        ) : product.sizes ? (
          <div>
            <p>
              <strong>Sizes inventory:</strong>
            </p>
            <ul>
              {Object.entries(product.sizes).map(([size, qty]) => (
                <li key={size}>
                  <strong>{size}:</strong> {qty}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>
            <em>No inventory info available</em>
          </p>
        )}

        <p>
          <strong>Available: {String(product.available)}</strong>
        </p>

        {editing && (
          <EditProductForm product={product} onUpdate={handleUpdate} />
        )}

        <br />
      </li>
      <button onClick={() => setEditing(!editing)}>
        {editing ? "Cancel editing" : "Edit product"}
      </button>
    </>
  );
};

export default Product;
