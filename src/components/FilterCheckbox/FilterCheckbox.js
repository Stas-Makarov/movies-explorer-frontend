import "./FilterCheckbox.css";
import { useLocation } from "react-router-dom";


export const FilterCheckbox = ({
  isFilterMovies,
  changeFilter,
  isFilterSavedMovies,
}) => {
  const location = useLocation();
  const locationMovies = location.pathname === "/movies";

  let checkboxClassName = `filter-checkbox__button ${
    locationMovies && isFilterMovies
      ? "filter-checkbox__button_inactive"
      : "filter-checkbox__button"
  } ${
    !locationMovies && isFilterSavedMovies
      ? "filter-checkbox__button_inactive"
      : "filter-checkbox__button"
  }`;

  function handleChangeFilter() {
    changeFilter();
  }
  return (
    <>
      <button className={checkboxClassName} type="button" onClick={handleChangeFilter}></button>
      <p className="filter-checkbox__text">Короткометражки</p>
    </>
  );
};
