import "./Portfolio.css";
import link from '../../images/link.svg'

export function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className='portfolio__list'>
          <li className='portfolio__list-item'>
            <a className='portfolio__list-item-src' 
              target="_blank" 
              href="https://github.com/Stas-Makarov/how-to-learn" 
              rel="noreferrer">
              <p className='portfolio__list-item-text'>Статичный сайт</p>
              <img className='portfolio__list-item-image' alt='link' src={link} />
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a className='portfolio__list-item-src' 
              target="_blank" 
              href="https://github.com/Stas-Makarov/russian-travel" 
              rel="noreferrer">
              <p className='portfolio__list-item-text'>Адаптивный сайт</p>
              <img className='portfolio__list-item-image' alt='link' src={link} />
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a className='portfolio__list-item-src' 
              target="_blank" 
              href="https://github.com/Stas-Makarov/react-mesto-api-full" 
              rel="noreferrer">
              <p className='portfolio__list-item-text'>Одностраничное приложение</p>
              <img className='portfolio__list-item-image' alt='link' src={link} />
            </a>
          </li>
        </ul>
    </section>
  );
};
