import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import "./Profile.css";
import { Header } from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidation } from "../../hooks/useValidation";

export const Profile = ({
  onSignOut,
  changeProfile,
  profileError,
  setProfileError,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const { handleChange, errors, isValid, resetForm } = useValidation({
    name: nameRef.current.value,
    email: emailRef.current.value,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  
  const onFormSumbit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      changeProfile({ name, email });
      resetForm();
    }
  };

  function handleClickSignOut() {
    resetForm();
    onSignOut();
  }

  function handleChangeInput(e) {
    handleChange(e);
    if (profileError.length > 0) {
      setProfileError("");
    }
  }

  useEffect(() => {
    if (
      nameRef.current.value === currentUser.name &&
      emailRef.current.value === currentUser.email
    ) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [
    nameRef.current.value,
    emailRef.current.value,
    currentUser.name,
    currentUser.email,
  ]);

  return (
    <>
      <Header />
      <main>
        <section className="profle">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <form className="profile__form" onSubmit={onFormSumbit}>
          <div className="profile__fields">
            <div className="profile__field">
              <p className="profile__text">Имя</p>
              <input
                className="profile__input"
                name="name"
                ref={nameRef}
                values={nameRef.current.value}
                defaultValue={currentUser.name}
                pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                type="text"
                onChange={handleChangeInput}
                minLength="2"
                required
                autoComplete="off"
              />
            </div>
            <span className="profile__error">{errors.name}</span>
            <div className="profile__field">
              <p className="profile__text">E-mail</p>
              <input
                className="profile__input"
                name="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                values={emailRef.current.value}
                onChange={handleChangeInput}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                type="email"
                required
                autoComplete="off"
              />
            </div>
            <span className="profile__error">{errors.email}</span>
          </div>
          <div className="profile__buttons">
            <button
              className={
                !isValid || !isUpdate
                  ? "profile__button-submit profile__button_invalid"
                  : "profile__button-submit"
              }
              disabled={!isValid || !isUpdate}
              type="submit"
            >
              Редактировать
            </button>
            <button
              className="profile__button-logout"
              type="button"
              onClick={handleClickSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
        </section>
      </main>
    </>
  );
};