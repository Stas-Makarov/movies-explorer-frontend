import "./AboutMe.css";
import avatar from "../../images/ava.svg";

export function AboutMe() {
  return (
    <section className="about" id="about">
      <h3 className="about__title">Студент</h3>
      <div className="about__content">
        <div>
          <h4 className="about__content_name">Стас</h4>
          <p className="about__content_profession">
            Фронтенд-разработчик, 35 лет
          </p>
          <p className="about__content_description">
            Я живу в Казани, закончил КГУ им. В.И. Ульянова-Ленина. Недавно начал кодить. 
            Занялся изучением веб-разработки, т.к. мне нравится воплощать идеи в жизнь.
            Веб-разработка имеет неограниченные возможности, которые впечатляют. 
            В ближайщее время планирую перейти в айти сферу.
          </p>
          <div className="about__content_links">
            <a
              className="about__content_link"
              href="https://github.com/Stas-Makarov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <img className="about__content_photo" src={avatar} alt='avatar' />
      </div>
    </section>
  );
};
 