import "./Portfolio.css";

export function Portfolio() {
  return (
    <section className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <div className="portfolio__job">
        <p className="potfolio__job_text">Статичный сайт</p>
        <a
          className="portfolio__job_link"
          href="https://github.com/Stas-Makarov/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
        </a>
      </div>
      <div className="portfolio__job">
        <p className="potfolio__job_text">Адаптивный сайт</p>
        <a
          className="portfolio__job_link"
          href="https://github.com/Stas-Makarov/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
        </a>
      </div>
      <div className="portfolio__job">
        <p className="potfolio__job_text">Одностраничное приложение</p>
        <a
          className="portfolio__job_link"
          href="https://github.com/Stas-Makarov/react-mesto-api-full"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
        </a>
      </div>
    </section>
  );
};
