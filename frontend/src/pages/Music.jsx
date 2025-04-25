import BackToTopButton from "../components/BackToTopButton";

const Music = () => {
  return (
    <article className="page">
      <header>
        <h1>Music</h1>
        <p>Music releases and embeddings will be on this page</p>
      </header>

      <section>
        <header>
          <h2>Music Videos</h2>
          <p>Here you will find our music videos</p>
        </header>

        <section>
          <h3>The Writer's Block</h3>
          <figure>
            <figcaption className="visually-hidden">
              YouTube embed of The Writer's Block music video
            </figcaption>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/eFzAeEK2KnI?si=oMv_2R-qPbMXd3FF"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </figure>
        </section>

        <section>
          <h3>Shadowman</h3>
          <figure>
            <figcaption className="visually-hidden">
              YouTube embed of Shadowman music video
            </figcaption>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/MOBmZSUYun0?si=K8rWkQLwOxcvOtQV"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </figure>
        </section>
      </section>

      <section>
        <header>
          <h2>Releases</h2>
          <p>
            Here you will find pictures of our releases and related info like
            songs, release date etc.
          </p>
        </header>

        <h2>EPs</h2>

        <section>
          <h3>Of Things That Define Us</h3>

          <figure>
            <img
              src="/images/OTTDU-album-cover-1200x1200.jpg"
              alt="Of Things That Define Us - EP cover photo"
              width={1200}
              height={1200}
              style={{ width: "40rem", height: "40rem" }}
            />
            <figcaption>
              <em>Of Things That Define Us</em> album cover
            </figcaption>
          </figure>

          <figure>
            <figcaption className="visually-hidden">
              Spotify embed of the EP "Of Things That Define Us"
            </figcaption>
            <iframe
              src="https://open.spotify.com/embed/album/7uKRQa6MukvdtPFInDxq3q?utm_source=generator"
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: "12px" }}
              allowFullScreen
            ></iframe>
          </figure>

          <figure>
            <figcaption className="visually-hidden">
              Bandcamp embed of the EP "Of Things That Define Us"
            </figcaption>
            <iframe
              style={{ border: 0, width: 400, height: 340 }}
              src="https://bandcamp.com/EmbeddedPlayer/album=1554536734/size=large/bgcol=333333/linkcol=e99708/artwork=small/transparent=true/"
              seamless
            >
              <a href="https://nokianmonark.bandcamp.com/album/of-things-that-define-us">
                Of Things That Define Us by Nøkian Monark
              </a>
            </iframe>
          </figure>
        </section>
      </section>

      <footer>
        <BackToTopButton />
      </footer>
    </article>
  );
};

export default Music;
