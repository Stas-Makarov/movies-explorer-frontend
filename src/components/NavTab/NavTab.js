import "./NavTab.css";

export function NavTab() {
  return (
    <nav className="nav-tab">
      <div className="nav-tab__wrapper">
        <a href="/#project" className="nav-tab__link">
          О проекте
        </a>
      </div>
      <div className="nav-tab__wrapper">
        <a href="/#techs" className="nav-tab__link">
          Технологии
        </a>
      </div>
      <div className="nav-tab__wrapper">
        <a href="/#about" className="nav-tab__link">
          Студент
        </a>
      </div>
    </nav>
  );
};
