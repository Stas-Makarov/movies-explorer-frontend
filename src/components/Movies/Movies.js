import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Header } from "../Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import { saveMovie, deleteSavedMovie } from '../../utils/MainApi';
import { getInitialMovies  } from '../../utils/MoviesApi';
import { search } from '../../utils/utils';

import "./Movies.css";

export const Movies = () => {
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const [searchResult, setSearchResult] = useState({
    items: [],
    text: '',
    onlyShortMovies: false,
  });

  const token = useAuth();

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
    getInitialMovies().then((items) => {
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
      saveMovie({ token, movie: newItems[savedMovieIndex] })
          .then((movie) => {
            newItems[savedMovieIndex] = movie;

            setSearchResult({
              ...searchResult,
              items: newItems
            });
          });
    } else {
      deleteSavedMovie({ token, id: newItems[savedMovieIndex].id })
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
    onChangeScreenWidth();
  }, []);
 
  const dislayItems = searchResult.items.slice(
    0,
    numberMoviesInDisplay
  );

  function addMoviesInCollectionVisible() {
    setNumberMoviesInDisplay((prevState) => prevState + numberMoviesAdd);
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