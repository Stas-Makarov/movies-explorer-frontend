import "./Register.css";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <section className="register">
      <Link to="/" className="register__logo"></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" >
        <fieldset className="register__fieldset">
          <div className="register__field">
            <p className="register__text">Имя</p>
            <input
              className="register__input"
              type="text"
            />
            <span className="register__error"></span>
          </div>
          <div className="register__field">
            <p className="register__text">E-mail</p>
            <input
              className="register__input"
              type="email"
            />
            <span className="register__error"></span>
          </div>
          <div className="register__field">
            <p className="register__text">Пароль</p>
            <input
              className="register__input"
              type="password"
            />
            <span className="register__error"></span>
          </div>
        </fieldset>
        <div className="register__bottom">
          <span className="register__error"></span>
          <button
            className="register__button register__button_invalid"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <div className="register__links">
            <p className="register__answer">Уже зарегистрированы?</p>
            <Link
              className="register__link"
              to="/signin"
            >
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};