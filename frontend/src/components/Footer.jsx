const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footerdiv">
      <br />
      <em>© Nøkian Monark {year}</em>
    </div>
  );
};

export default Footer;
