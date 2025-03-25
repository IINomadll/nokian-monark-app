const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <em>&copy; Nøkian Monark {year}</em>
    </footer>
  );
};

export default Footer;
