import React from "react";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./SavedMovies.css";
export const SavedMovies = () => {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MovieCardList />
    </section>
  );
};