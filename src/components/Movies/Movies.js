import React from "react";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./Movies.css";

export const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MovieCardList />
      <button
        type="button"
        className="movies__more_hide movies__more"
      >
        Еще
      </button>
    </section>
  );
};