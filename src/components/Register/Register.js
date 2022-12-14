import "./Register.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";

export const Register = ({
  onRegister,
  clearErrors,
  registerError,
  setRegisterError,
}) => {

  const { values, handleChange, errors, isValid, resetForm } = useValidation();

  function handleRegister(e) {
    e.preventDefault();
    onRegister({
      email: values.email,
      name: values.name,
      password: values.password,
    });
    resetForm();
  }

  function handleClearErrors() {
    resetForm();
    clearErrors();
  }
  
  function handleChangeInput(e) {
    handleChange(e);
    if (registerError.length > 0) {
      setRegisterError("");
    }
  }

  return (
    <section className="register">
      <Link to="/" className="register__logo"></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleRegister}>
        <fieldset className="register__fieldset">
          <div className="register__field">
            <p className="register__text">Имя</p>
            <input
              className="register__input"
              type="text"
              name="name"
              value={values.name || ""}
              onChange={handleChangeInput}
              pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
              required
              minLength="2"
              placeholder="Имя"
              autoComplete="off"
            />
            <span className="register__error">{errors.name}</span>
          </div>
          <div className="register__field">
            <p className="register__text">E-mail</p>
            <input
              className="register__input"
              type="email"
              name="email"
              value={values.email || ''}
              onChange={handleChangeInput}
              placeholder="Email"
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              autoComplete="off"
            />
            <span className="register__error">{errors.email}</span>
          </div>
          <div className="register__field">
            <p className="register__text">Пароль</p>
            <input
              className="register__input"
              type="password"
              name="password"
              value={values.password || ""}
              onChange={handleChangeInput}
              required
              minLength="8"
              placeholder="Пароль"
              autoComplete="off"
            />
            <span className="register__error">{errors.password}</span>
          </div>
        </fieldset>
        <div className="register__bottom">
          <span className="register__error">{registerError}</span>
          <button
            className={isValid ? "register__button" : "register__button register__button_invalid"}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
          <div className="register__links">
            <p className="register__answer">Уже зарегистрированы?</p>
            <Link
              className="register__link"
              to="/signin"
              onClick={handleClearErrors}
            >
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};