import React from "react";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
export const SearchForm = () => {
  return (
    <>
      <form className="search-form">
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
        />
        <div className="search-form__right">
          <button
            className="search-form__button"
            type="submit"
          ></button>
        </div>
        <div className="filter-checkbox">
          <FilterCheckbox />
        </div>
      </form>
      <span className="search-form__error">Нужно ввести ключевое слово</span>
      <div className="filter-checkbox_mobile">
        <FilterCheckbox />
      </div>
    </>
  );
};