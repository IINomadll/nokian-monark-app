const Product = ({ product, onAddToCart }) => {
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

        {product.available ? (
          <p>
            <strong>In stock</strong>
          </p>
        ) : (
          <p>
            <strong>Out of stock</strong>
          </p>
        )}
      </section>

      {product.available && (
        <footer style={{ marginTop: "1rem" }}>
          <button onClick={() => onAddToCart(product)}>Add to cart</button>
        </footer>
      )}
    </article>
  );
};

export default Product;
