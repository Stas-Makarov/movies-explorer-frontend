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
  
  useEffect(() => {
    setShortMoviesFilter(onlyShortMovies);
    setTextInput(value);
  }, [value, onlyShortMovies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (textInput === '') {
      setValidForm(false);
      return;
    }
    onSubmit(textInput, onlyShortFilter);
  }

  const handleChangeFilter = (value) => {
    if (textInput === '') {
      setValidForm(false);
      return;
    }
    setShortMoviesFilter(value);
    onSubmit(textInput, value);
  }

  
  function handleChangeInput(e) {
    const value = e.target.value.trim(); 
    setTextInput(value);
    setValidForm(value !== '');
  }

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          onChange={handleChangeInput}
          value={textInput}
          type="text"
          placeholder="Фильм"
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
      <span className="search-form__error">{!validForm ? "Нужно ввести ключевое слово" : ""}</span>
      <div className="filter-checkbox_mobile">
        <FilterCheckbox
          onChange={handleChangeFilter}
          value={onlyShortFilter}
        />
      </div>
    </>
  );
};