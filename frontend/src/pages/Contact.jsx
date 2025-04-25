import YouTubeMono from "../assets/images/yt_icon_mono_dark-734x518.png";
import FacebookMono from "../assets/images/Facebook_Logo_Secondary-2084x2084.png";

const Contact = () => {
  return (
    <article className="page">
      <header>
        <h1>Contact Nøkian Monark</h1>
      </header>

      <section>
        <h2>Have questions? Trouble with order?</h2>
        <form
          action="https://formsubmit.co/f1e162fa6dfd591946abce635893fc07"
          method="POST"
        >
          <fieldset>
            <legend>Contact us!</legend>

            <p>
              <label htmlFor="name">Name:</label>
              <br />
              <input type="text" id="name" name="name" required />
            </p>

            <p>
              <label htmlFor="email">Email:</label>
              <br />
              <input type="email" id="email" name="email" required />
            </p>

            <p>
              <label htmlFor="message">Message:</label>
              <br />
              <textarea
                type="text"
                id="message"
                name="message"
                cols={70}
                rows={10}
                required
              />
            </p>
          </fieldset>

          <div className="form-actions">
            <button type="submit">Send</button>
          </div>
        </form>
      </section>

      <footer style={{ backgroundColor: "grey" }}>
        <h2>Follow us</h2>
        <ul
          className="social-links"
          style={{ listStyle: "none", padding: 0, display: "flex" }}
        >
          <li style={{ marginRight: "1rem" }}>
            <a
              href="https://www.youtube.com/@nkianmonark9614"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* visually‑hidden text instead of aria-label (more robust) */}
              <span className="visually-hidden">Visit our YouTube channel</span>
              <img
                src={YouTubeMono}
                alt="Nøkian Monark on YouTube"
                width={734}
                height={518}
                style={{ width: "5rem", height: "3.53rem" }}
              />
            </a>
          </li>

          <li>
            <a
              href="https://www.facebook.com/nokianmonark/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="visually-hidden">Visit our Facebook</span>
              <img
                src={FacebookMono}
                alt="Nøkian Monark on Facebook"
                width={2084}
                height={2084}
                style={{ width: "5rem", height: "5rem" }}
              />
            </a>
          </li>
        </ul>
      </footer>
    </article>
  );
};

export default Contact;
