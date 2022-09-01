import React from "react";

import "./FilterCheckbox.css";

export const FilterCheckbox = ({
  value,
  onChange
}) => {
  let checkboxClassName = `filter-checkbox__button ${ value ? "filter-checkbox__button_inactive": "filter-checkbox__button"}`;

  function handleChangeFilter() {
    onChange(!value);
  }

  return (
    <>
      <button className={checkboxClassName} type="button" onClick={handleChangeFilter}></button>
      <p className="filter-checkbox__text">Короткометражки</p>
    </>
  );
};
