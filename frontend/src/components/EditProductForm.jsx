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
    <section aria-labelledby={`edit-product-${product.id}-heading`}>
      <h3 id={`edit-product-${product.id}-heading`}>Edit product</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Editing form</legend>

          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
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
          </div>

          <legend className="visually-hidden">Product category</legend>
          <p>Category:</p>
          {["apparel", "media", "accessory"].map((option) => (
            <div key={option}>
              <input
                type="radio"
                name="category"
                id={`category-${option}`}
                value={option}
                checked={formData.category === option}
                onChange={handleChange}
              />
              <label htmlFor={`category-${option}`}>{option}</label>
            </div>
          ))}

          <div className="form-field">
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
          </div>

          <div className="form-field">
            <label htmlFor="material">Material:</label>
            <br />
            <input
              type="text"
              name="material"
              id="material"
              value={formData.material}
              onChange={handleChange}
            />
          </div>

          {mode === "sizes" && (
            <fieldset>
              <legend>Sizes inventory</legend>
              {["S", "M", "L", "XL"].map((size) => (
                <div key={size} className="form-field">
                  <label htmlFor={`size_${size}`}>{size}:</label>
                  <input
                    type="number"
                    id={`size_${size}`}
                    name={`size_${size}`}
                    value={formData.sizes?.[size] || 0}
                    onChange={handleChange}
                    min={0}
                  />
                </div>
              ))}
            </fieldset>
          )}

          {mode === "quantity" && (
            <div className="form-field">
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
            </div>
          )}

          <div className="form-field">
            <label htmlFor="available">Available:</label>
            <br />
            <input
              type="checkbox"
              name="available"
              id="available"
              checked={formData.available}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
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
          </div>

          <br />

          <div className="form-actions">
            <button type="submit">Save changes</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default EditProductForm;
