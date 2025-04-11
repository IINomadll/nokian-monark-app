import YouTubeMono from "../assets/images/yt_icon_mono_dark-734x518.png";
import FacebookMono from "../assets/images/Facebook_Logo_Secondary-2084x2084.png";

const Contact = () => {
  return (
    <>
      <h1>Contact Nøkian Monark</h1>
      <section>
        <h2>Have questions? Order trouble?</h2>
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
            <button type="submit">Send</button>
          </fieldset>
        </form>
      </section>
      <section>
        <figure>
          <a
            href="https://www.youtube.com/@nkianmonark9614"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={YouTubeMono}
              alt="Monochrome dark YouTube -logo"
              width={734}
              height={518}
            />
          </a>
        </figure>
        <figure>
          <a
            href="https://www.facebook.com/nokianmonark/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={FacebookMono}
              alt="Monochrome white Facebook -logo"
              width={2084}
              height={2084}
            />
          </a>
        </figure>
      </section>
    </>
  );
};

export default Contact;
