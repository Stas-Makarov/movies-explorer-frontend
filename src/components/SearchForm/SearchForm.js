import React from "react";
import { useState, useEffect } from "react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export const SearchForm = ({
  value = "",
  onlyShortMovies = false,
  onSubmit
}) => {
  const [validForm, setValidForm] = useState(true);
  const [onlyShortFilter, setShortMoviesFilter] = useState(onlyShortMovies);
  const [textInput, setTextInput] = useState('');
  const [isFocused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);

  useEffect(() => {
    setShortMoviesFilter(onlyShortMovies);
    setTextInput(value);
  }, [value, onlyShortMovies]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(textInput, onlyShortFilter);
  }

  const handleChangeFilter = (value) => {
    setShortMoviesFilter(value);
    onSubmit(textInput, value);
  }

  
  function handleChangeInput(e) {
    setTextInput(e.target.value);
    setValidForm(e.target.checkValidity());
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          onChange={handleChangeInput}
          value={textInput}
          onFocus={handleFocus}
          type="text"
          placeholder="Фильм"
          minLength="2"
          autoComplete="off"
        />
        <div className="search-form__right">
          <button
            className="search-form__button"
            disabled={!validForm}
            type="submit"
          ></button>
        </div>
        <div className="filter-checkbox">
          <FilterCheckbox 
            onChange={handleChangeFilter}
            value={onlyShortFilter}
          />
        </div>
      </form>
      <span className="search-form__error">{!validForm || (isFocused && !textInput)? "Нужно ввести ключевое слово" : ""}</span>
      <div className="filter-checkbox_mobile">
        <FilterCheckbox
          onChange={handleChangeFilter}
          value={onlyShortFilter}
        />
      </div>
    </>
  );
};