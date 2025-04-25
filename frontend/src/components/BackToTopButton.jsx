const BackToTopButton = () => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    Back to top ⬆
  </button>
);

export default BackToTopButton;
