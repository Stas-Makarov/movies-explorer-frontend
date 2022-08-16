import React from "react";
import "./Profile.css";
export const Profile = () => {
  return (
    <section className="profle">
      <h1 className="profile__title">Привет, </h1>
      <form className="profile__form" >
        <div className="profile__fields">
          <div className="profile__field">
            <p className="profile__text">Имя</p>
            <input
              className="profile__input"
              name="name"
            />
            <span className="profile__error"></span>
          </div>
          <div className="profile__field">
            <p className="profile__text">E-mail</p>
            <input
              className="profile__input"
              name="email"
            />
            <span className="profile__error"></span>
          </div>
        </div>
        <div className="profile__buttons">
          <button
            className="profile__button-submit profile__button_invalid"
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};