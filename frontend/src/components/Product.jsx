const Product = ({ product }) => {
  return (
    <>
      <li>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price} €</p>
        <figure>
          <img
            src={product.imageUrl}
            alt="Product image"
            style={{ width: "15rem" }}
          />
        </figure>
      </li>
    </>
  );
};

export default Product;
