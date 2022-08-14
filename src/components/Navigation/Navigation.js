import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export const Navigation = (props) => {
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);
  const showBurgerMenu = () => {
    setIsShowBurgerMenu(true);
  };
  const closeBurgerMenu = () => {
    setIsShowBurgerMenu(false);
  };
  return (
    <nav className="navigation">
      {props.isLogged ? (
        <>
      <div className="navigation__logged">
        <div className="navigation__links">
          <Link to="/movies"
                className="navigation__movie navigation__movie_thin"
          >Фильмы</Link>
          <Link to="/saved-movies"
                className="navigation__movie navigation__movie_thin"
          >Сохранённые фильмы</Link>
        </div>
        <Link to="/profile"
              className="navigation__account navigation__account_main"
        >Аккаунт</Link>
      </div>
      <button
        className="navigation__burger-menu"
        onClick={showBurgerMenu}
      ></button>
      </>
      ) : (
        <div className="navigation__links">
          <Link
            to="/signup"
            className="navigation__link navigation__link_black"
          >
            Регистрация
          </Link>
          <Link to="/signin" className="navigation__link">
            Войти
          </Link>
        </div>
      )}
            
      {isShowBurgerMenu ? (
        <div className="burger-menu">
          <div className="burger-menu__container">
            <button
              type="button"
              className="burger-menu__close"
              onClick={closeBurgerMenu}
            ></button>
            <div className="burger-menu__content">
              <div className="burger-menu__links">
                <Link className="burger-menu__link burger-menu__decoration"
                      to="/"
                >Главная</Link>
                <Link className="burger-menu__link burger-menu__decoration"
                      to="/movies"
                >Фильмы</Link>
                <Link className="burger-menu__link burger-menu__decoration"
                      to="/saved-movies"
                >Сохранённые фильмы</Link>
              </div>
              <Link className="burger-menu__profile burger-menu__decoration-profile"
                    to="/profile"
              >Аккаунт</Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};