import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Header } from "../Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import { getContent, saveMovie } from '../../utils/MainApi';
import { search, normalizeMovie } from '../../utils/utils';

import "./Movies.css";

export const Movies = () => {
  const [items, setItems] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const [searchResult, setSearchResult] = useState([]);
  const [filter, setFilter] = useState({});

  const token = useAuth();

  useEffect(() => {
    const getData = () => {
      setLoadingStatus('loading');
      const movies = localStorage.getItem('movies');
      if (movies) {
        setItems(JSON.parse(movies));
        setLoadingStatus('idle');
        return;
      }

      getContent(token).then((items) => {
        setItems(normalizeMovie(items));
        setLoadingStatus('idle');
      });
    }

    getData();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const filter = localStorage.getItem('filter');
    if (filter) {
      const prevFilter = JSON.parse(filter);
      setFilter(prevFilter);
    }
  }, []);

  useEffect(() => {
    const newSearchResult = search(items, filter.text, filter.onlyShortMovies);
    localStorage.setItem('filter', JSON.stringify(filter));
    setSearchResult(newSearchResult);
  }, [filter, items]);

  const handleSearchFormSubmit = useCallback((text, onlyShortMovies) => {
    setFilter({ text, onlyShortMovies });
  }, [setFilter]);

  const handleMovieSaveInStore = useCallback((item) => {
    saveMovie({ token, item })
          .then((res) => {
            const movies = [...searchResult, res];
            localStorage.setItem("savedMovies", JSON.stringify(movies));
            setSearchResult((prev) => [...prev, res]);
          })
          // .catch((err) => setServerError(true));
  }, [searchResult, token]);

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
 
  const dislayItems = searchResult.slice(
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
        <SearchForm onSubmit={handleSearchFormSubmit}/>

          <MovieCardList 
            items={dislayItems}
            onChangeFavorite={handleMovieSaveInStore}
            isLoading={loadingStatus === 'loading'}

          />
          <button
            className={dislayItems.length === items.length ? "movies__more_hide"  : "movies__more"}
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