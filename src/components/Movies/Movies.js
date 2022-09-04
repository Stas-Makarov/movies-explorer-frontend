import React from "react";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { useApi } from "../../hooks/useApi";
import { useDisplayCount } from "../../hooks/useDisplayCount";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import { search } from '../../utils/utils';

import "./Movies.css";

export const Movies = () => {
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const [searchResult, setSearchResult] = useState({
    items: [],
    text: '',
    onlyShortMovies: false,
  });

  const api = useApi();

  useEffect(() => {
    const getData = () => {
      setLoadingStatus('loading');
      const searchResult = localStorage.getItem('searchResult');
      if (searchResult) {
        const parsedSearchResult = JSON.parse(searchResult);
        setSearchResult(parsedSearchResult);
      }
      setLoadingStatus('idle');
    }

    getData();
  }, []);

  const handleSearchFormSubmit = (text, onlyShortMovies) => {
    setLoadingStatus('loading');
    api.getMovies().then((items) => {
      const searchResult = {
        items: search(items, text, onlyShortMovies),
        text,
        onlyShortMovies
      };
      localStorage.setItem('searchResult', JSON.stringify(searchResult));
      setSearchResult(searchResult);
      setLoadingStatus('idle');
    });
  };

  const handleMovieSaveInStore = (id, liked) => {
    const newItems = searchResult.items.slice();
    const savedMovieIndex = newItems.findIndex((movie) => id === movie.movieId);

    if (liked) {
      api.saveMovie(newItems[savedMovieIndex])
          .then((movie) => {
            newItems[savedMovieIndex] = movie;

            setSearchResult({
              ...searchResult,
              items: newItems
            });
          });
    } else {
      api.deleteMovie(newItems[savedMovieIndex].id)
          .then(() => {
            newItems[savedMovieIndex] = {
              ...newItems[savedMovieIndex],
              owner: undefined
            };

            setSearchResult({
              ...searchResult,
              items: newItems
            });
          });
    }
  };

  const displaySettings = useDisplayCount();

  const [numberMoviesInDisplay, setNumberMoviesInDisplay] = useState(displaySettings.initialDisplayCount);

  useEffect(() => setNumberMoviesInDisplay(displaySettings.initialDisplayCount), [displaySettings.initialDisplayCount]);
 
  const dislayItems = searchResult.items.slice(
    0,
    numberMoviesInDisplay
  );

  function addMoviesInCollectionVisible() {
    setNumberMoviesInDisplay((prevState) => prevState + displaySettings.loadingItemsCount);
  }

  return (
    <>
      <Header />
      <main>
        <section className="movies">
        <SearchForm
          value={searchResult.text}
          onlyShortMovies={searchResult.onlyShortMovies}
          onSubmit={handleSearchFormSubmit}
        />
          <MovieCardList 
            items={dislayItems}
            onChangeFavorite={handleMovieSaveInStore}
            isLoading={loadingStatus === 'loading'}

          />
          <button
            className={dislayItems.length === searchResult.items.length ? "movies__more_hide"  : "movies__more"}
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