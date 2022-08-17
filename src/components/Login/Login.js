import "./Login.css";
import { Link } from "react-router-dom";
import React from "react";

export const Login = () => {
  return (
    <section className="login">
      <Link to="/" className="login__logo"></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" >
        <fieldset className="login__fieldset">
          <div className="login__field">
            <p className="login__text">E-mail</p>
            <input
              className="login__input"
              type="email"
              name="email"
              required
              autoComplete="off"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            />
            <span className="login__error"></span>
          </div>
          <div className="login__field">
            <p className="login__text">Пароль</p>
            <input
              className="login__input"
              type="password"
              name="password"
              required
              minLength="4"
              autoComplete="off"
            />
            <span className="login__error"></span>
          </div>
        </fieldset>
        <div className="login__bottom">
          <span className="login__error"></span>
          <button
            className="login__button login__button_invalid"
            type="submit"
          >
            Войти
          </button>
          <div className="login__links">
            <p className="login__answer">Ещё не зарегистрированы?</p>
            <Link
              className="login__link"
              to="/signup"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};