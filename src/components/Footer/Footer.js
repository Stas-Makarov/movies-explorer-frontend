import './Footer.css';

export function Footer() {
  return (
    <>
      <footer className="footer">
        <h6 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h6>
        <div className="footer__bottom">
          <p className="footer__year">&copy; 2022</p>
          <div className="footer__links">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              className="footer__link"
              href="https://github.com/Stas-Makarov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
