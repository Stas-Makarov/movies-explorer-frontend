import React, { useEffect } from "react";
import { useState } from "react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export const SearchForm = ({
  isSaved,
  searchMovies,
  searchSavedMovies,
  isFilterMovies,
  changeFilter,
  isFilterSavedMovies,
}) => {
  const [validForm, setValidForm] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [isFocused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);

  useEffect(() => {
    if (!isSaved) {
      setTextInput(localStorage.getItem("searchText"));
    }
  }, [setTextInput, isSaved]);
  
  function handleChangeInput(e) {
    setTextInput(e.target.value);
    setValidForm(e.target.checkValidity());
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    searchMovies(textInput);
    localStorage.setItem("searchText", textInput);
  }

  function handleSearchSavedMovies(e) {
    e.preventDefault();
    searchSavedMovies(textInput);
  }
  return (
    <>
      <form className="search-form" onSubmit={isSaved ? handleSearchSavedMovies : handleSearchMovies}>
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          onChange={handleChangeInput}
          value={textInput}
          onFocus={handleFocus}
          type="text"
          placeholder="Фильм"
          minLength="4"
          autoComplete="off"
          required
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
            isFilterMovies={isFilterMovies}
            changeFilter={changeFilter}
            isFilterSavedMovies={isFilterSavedMovies}
          />
        </div>
      </form>
      <span className="search-form__error">{!validForm || (isFocused && !textInput)? "Нужно ввести ключевое слово" : ""}</span>
      <div className="filter-checkbox_mobile">
        <FilterCheckbox
          isFilterMovies={isFilterMovies}
          changeFilter={changeFilter}
          isFilterSavedMovies={isFilterSavedMovies} 
        />
      </div>
    </>
  );
};