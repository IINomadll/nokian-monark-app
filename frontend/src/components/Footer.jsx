const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <hr />
      <em>&copy; Nøkian Monark {year}</em>
    </footer>
  );
};

export default Footer;
