const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <hr />
      <p>
        <em>&copy; Nøkian Monark {year}</em>
      </p>
    </footer>
  );
};

export default Footer;
