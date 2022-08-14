import React from "react";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import "./Movies.css";

export const Movies = () => {
  return (
    <section className="movies">
      <Header />
      <SearchForm />
      <MovieCardList />
      <button
        type="button"
        className="movies__more_hide movies__more"
      >
        Еще
      </button>
      <Footer />
    </section>
  );
};