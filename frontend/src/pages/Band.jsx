import bandImg from "../assets/images/band-promo-1920x1080.png";

const Band = () => {
  return (
    <>
      <h1>Nøkian Monark</h1>
      <article>
        <figure>
          <img src={bandImg} alt="Band photo" width={1920} height={1080} />
          <figcaption>
            Lassi Lehtinen, Tatu Kekkonen, Manu Lehtinen, Waltteri Lehtinen,
            Taneli Törölä
          </figcaption>
        </figure>

        <h2>Biography</h2>

        <p>
          Nøkian Monark is a Finnish metal band formed in 2020. Their musical
          style can be described as black'n roll - rocking and groovy, black
          metal -based style of extreme metal.
        </p>

        <p>
          The band is a well balanced combination of experience and young blood,
          as three of the members have a long history in finnish metal and rock
          bands, whereas two of the youngest members are bringing fresh energy
          and modern twist for the package.
        </p>

        <p>
          Three of the band members are composing songs, resulting in a healthy
          proportion of variety between the songs. The lyrics are written by the
          vocalist Manu Lehtinen and the whole band is giving their efforts for
          the arrangements.
        </p>

        <p>
          On Dec 21, 2021 the fivesome released their debut single “Shadowman”,
          supported by a music video. A six song EP “OF Things That Define Us”
          was released on February 28, 2023. The band also shot a music video
          for one of the EP's songs, that being released on March 13, 2023.
        </p>

        <p>
          Nøkian Monark is also heading for some live performances, so stay
          tuned for more news!
        </p>

        <h2>Members:</h2>

        <ul>
          <li>Manu Lehtinen - vocals</li>
          <li>
            Taneli Törölä - guitar, <abbr title="background vocals">BGV</abbr>
          </li>
          <li>
            Lassi Lehtinen - guitar, <abbr title="background vocals">BGV</abbr>
          </li>
          <li>
            Tatu Kekkonen - bass, <abbr title="background vocals">BGV</abbr>
          </li>
          <li>Waltteri Lehtinen - drums</li>
        </ul>

        {/* <blockquote>
          "Lorem ipsum dolor sit amet..." – Cicero,{" "}
          <cite>de Finibus Bonorum et Malorum</cite>
        </blockquote> */}
      </article>
    </>
  );
};

export default Band;
