import React from "react";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import "./SavedMovies.css";

export const SavedMovies = ({
  isLogged,
  moviesCollection,
  searchMovies,
  searchSavedMovies,
  isLoadingMovies,
  savedMovies,
  movieDeleteFromSavedMovies,
  movieSaveInStore,
  setSearchShortMovies,
  isFilterSavedMovies,
  changeFilter,
  foundError,
  serverError,
}) => {
  
  return (
    <>
      <Header
        isLogged={isLogged}
        isMain={false}
        isProfile={false}
        isMovies={false}
        isSavedMovies={true}
      />
      <main>
        <section className="saved-movies">
          <SearchForm 
            isSaved={true}
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isFilterSavedMovies={isFilterSavedMovies}
            changeFilter={changeFilter}
            setSearchShortMovies={setSearchShortMovies}
          />
          <MovieCardList 
            moviesCollection={moviesCollection}
            isSaved={true}
            isLoadingMovies={isLoadingMovies}
            savedMovies={savedMovies}
            movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
            movieSaveInStore={movieSaveInStore}
            foundError={foundError}
            serverError={serverError}
          />
        </section>
      </main>
      <Footer />
    </>
    
  );
};