import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import "./Navigation.css";

export const Navigation = () => {
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);
  const showBurgerMenu = () => {
    setIsShowBurgerMenu(true);
  };
  const closeBurgerMenu = () => {
    setIsShowBurgerMenu(false);
  };

  const { user } = useUser(); 
  
  return (
    <nav className="navigation">
      {user ? (
        <>
          <div className="navigation__logged">
            <div className="navigation__links">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive ? "navigation__movie navigation__movie_thin" : "navigation__movie"
                }
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive ? "navigation__movie navigation__movie_thin" : "navigation__movie"
                }
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "navigation__account navigation__account_main" : "navigation__account"
              }
            >
              Аккаунт
            </NavLink>
          </div>
          <button
            className="navigation__burger-menu"
            onClick={showBurgerMenu}
          ></button>
        </>
      ) : (
        <div className="navigation__links">
          <NavLink to="/signup" className="navigation__link">
            Регистрация
          </NavLink>
          <NavLink to="/signin" className="navigation__link">
            Войти
          </NavLink>
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
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "burger-menu__link burger-menu__decoration" : "burger-menu__link"
                  }
                  to="/"
                >
                  Главная
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "burger-menu__link burger-menu__decoration" : "burger-menu__link"
                  }
                  to="/movies"
                >
                  Фильмы
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "burger-menu__link burger-menu__decoration" : "burger-menu__link"
                  }
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
              </div>
              <NavLink
              className={({ isActive }) =>
                isActive ? "burger-menu__profile burger-menu__decoration-profile" : "burger-menu__profile"
              }
                to="/profile"
              >
                Аккаунт
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};