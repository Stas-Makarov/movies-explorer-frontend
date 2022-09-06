import "./Login.css";
import { Link } from "react-router-dom";
import React from "react";
import { useValidation } from "../../hooks/useValidation";

export const Login = ({ onLogin, loginError, setLoginError, clearErrors }) => {
  const { values, handleChange, errors, isValid, resetForm } = useValidation();
  
  function handleLogin(e) {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });
    resetForm();
  }
  
  function handleClearErrors() {
    resetForm();
    clearErrors();
  }
  
  function handleChangeInput(e) {
    handleChange(e);
    if (loginError.length > 0) {
      setLoginError("");
    }
  }

  return (
    <section className="login">
      <Link to="/" className="login__logo"></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <fieldset className="login__fieldset">
          <div className="login__field">
            <p className="login__text">E-mail</p>
            <input
              className="login__input"
              type="email"
              name="email"
              value={values.email || ""}
              onChange={handleChangeInput}
              placeholder="Email"
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              autoComplete="off"
            />
            <span className="login__error">{errors.email}</span>
          </div>
          <div className="login__field">
            <p className="login__text">Пароль</p>
            <input
              className="login__input"
              type="password"
              name="password"
              value={values.password || ""}
              onChange={handleChangeInput}
              placeholder="Пароль"
              required
              minLength="4"
              autoComplete="off"
            />
            <span className="login__error">{errors.password}</span>
          </div>
        </fieldset>
        <div className="login__bottom">
          <span className="login__error">{loginError}</span>
          <button
            className={isValid ? "login__button" : "login__button login__button_invalid"}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
          <div className="login__links">
            <p className="login__answer">Ещё не зарегистрированы?</p>
            <Link
              className="login__link"
              to="/signup"
              onClick={handleClearErrors}
            >
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};