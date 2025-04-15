import { useState } from "react";
import { toast } from "react-toastify";

import productService from "../services/products";

const EditProductForm = ({ product, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    imageUrl: product.imageUrl,
    material: product.material || "",
    sizes: product.sizes || null,
    quantity: product.quantity != null ? product.quantity : null,
    price: product.price,
    available: product.available,
  });

  // display mode: either "sizes" or "quantity"
  const [mode, setMode] = useState(
    product.sizes ? "sizes" : product.quantity != null ? "quantity" : null
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name.startsWith("size_")) {
      const sizeKey = name.split("_")[1];
      const newSizes = {
        ...(formData.sizes || { S: 0, M: 0, L: 0, XL: 0 }),
        [sizeKey]: parseInt(value, 10) || 0,
      };
      setFormData((prev) => ({
        ...prev,
        sizes: newSizes,
        quantity: null,
      }));
      setMode("sizes");
    } else if (name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        quantity: parseInt(value, 10) || 0,
        sizes: null,
      }));
      setMode("quantity");
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = {
      ...product,
      ...formData,
    };

    productService
      .update(updatedProduct, product.id)
      .then((response) => {
        console.log(response);
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error("error occured while updating product:", error);
        toast.error("Updating product failed!");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Edit product</legend>
          <p>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="description">Description:</label>
            <br />
            <textarea
              name="description"
              id="description"
              rows={5}
              cols={50}
              value={formData.description}
              onChange={handleChange}
            />
          </p>

          <legend>Category:</legend>
          {["apparel", "media", "accessory"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="category"
                id="category"
                value={option}
                checked={formData.category === option}
                onChange={handleChange}
              />
              {option}
              <br />
            </label>
          ))}

          <p>
            <label htmlFor="imageUrl">
              Image URL: (must start with /images/)
            </label>
            <br />
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="material">Material:</label>
            <br />
            <input
              type="text"
              name="material"
              id="material"
              value={formData.material}
              onChange={handleChange}
            />
          </p>

          {mode === "sizes" && (
            <>
              <p>Sizes:</p>
              {["S", "M", "L", "XL"].map((size) => (
                <label key={size}>
                  {size}:
                  <input
                    type="number"
                    name={`size_${size}`}
                    value={formData.sizes?.[size] || 0}
                    onChange={handleChange}
                    min={0}
                  />
                </label>
              ))}
            </>
          )}

          {mode === "quantity" && (
            <p>
              <label htmlFor="quantity">Quantity:</label>
              <br />
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formData.quantity || 0}
                onChange={handleChange}
                min={0}
              />
            </p>
          )}

          <p>
            <label htmlFor="available">Available:</label>
            <br />
            <input
              type="checkbox"
              name="available"
              id="available"
              checked={formData.available}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="price">Price (€):</label>
            <br />
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </p>

          <br />
          <button type="submit">Save changes</button>
        </fieldset>
      </form>
    </>
  );
};

export default EditProductForm;
