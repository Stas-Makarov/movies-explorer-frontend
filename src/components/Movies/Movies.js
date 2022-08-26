import React from "react";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";

import "./Movies.css";

export const Movies = ({
  isLogged,
  changeFilter,
  isFilterMovies,
  moviesCollection,
  searchSavedMovies,
  searchMovies,
  isLoadingMovies,
  savedMovies,
  movieDeleteFromSavedMovies,
  movieSaveInStore,
  foundError,
  serverError,
  clearAllErrors,
}) => {
  useEffect(() => {
    clearAllErrors();
  }, []);

  const [numberMoviesInDisplay, setNumberMoviesInDisplay] = useState(
    () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1279) {
        return 16;
      } else if (windowWidth >= 990) {
        return 12;
      } else if (windowWidth >= 500) {
        return 8;
      } else return 5;
    }
  );

  const [numberMoviesAdd, setNumberMoviesAdd] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      return 4;
    } else if (windowWidth >= 990) {
      return 3;
    } else if (windowWidth >= 500) {
      return 2;
    } else return 2;
  });

  function onChangeScreenWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      setNumberMoviesInDisplay(16);
      setNumberMoviesAdd(4);
    } else if (windowWidth >= 990) {
      setNumberMoviesInDisplay(12);
      setNumberMoviesAdd(3);
    } else if (windowWidth >= 500) {
      setNumberMoviesInDisplay(8);
      setNumberMoviesAdd(2);
    } else {
      setNumberMoviesInDisplay(5);
      setNumberMoviesAdd(2);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onChangeScreenWidth);
  }, []);

  const moviesCollectionVisible = moviesCollection.slice(
    0,
    numberMoviesInDisplay
  );

  function addMoviesInCollectionVisible() {
    setNumberMoviesInDisplay((prevState) => prevState + numberMoviesAdd);
  }

  return (
    <>
      <Header
        isLogged={isLogged}
        isMain={false}
        isMovies={true}
        isSavedMovies={false}
        isProfile={false}
      />
      <main>
        <section className="movies">
          <SearchForm 
            isSaved={false}
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isFilterMovies={isFilterMovies}
            changeFilter={changeFilter}
          />
          <MovieCardList 
            moviesCollection={moviesCollectionVisible}
            isSaved={false}
            isLoadingMovies={isLoadingMovies}
            savedMovies={savedMovies}
            movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
            movieSaveInStore={movieSaveInStore}
            foundError={foundError}
            serverError={serverError}
          />
          <button
            className={moviesCollectionVisible.length === moviesCollection.length ? "movies__more_hide"  : "movies__more"}
            type="button"
            onClick={addMoviesInCollectionVisible}
          >
          Еще
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};