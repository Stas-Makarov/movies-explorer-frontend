import React, { useState, useCallback, useEffect } from "react";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { getSavedMovies } from '../../utils/MainApi';
import { search, normalizeMovie } from '../../utils/utils';
import { useAuth } from '../../hooks/useAuth'; 
import "./SavedMovies.css";

export const SavedMovies = () => {
  const [items, setItems] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const [dislayItems, setDislayItems] = useState([]);
  const token = useAuth();

  useEffect(() => {
    const getData = () => {
      setLoadingStatus('loading');
      const savedItems = localStorage.getItem('savedMovies');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
        setLoadingStatus('idle');
        return;
      }

      getSavedMovies(token).then((items) => {
        setItems(normalizeMovie(items));
        setLoadingStatus('idle');
      });
    }

    getData();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(items));
  }, [items]);

  const [filter, setFilter] = useState({});

  useEffect(() => {
    setDislayItems(search(items, filter.text, filter.onlyShortMovies));
  }, [filter, items]);

  const handleSearchFormSubmit = useCallback((text, onlyShortMovies) => {
    setFilter({ text, onlyShortMovies });
  }, [setFilter]);

  const handleDelete = useCallback((id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }, [setItems]);
  
  return (
    <>
      <Header />
      <main>
        <section className="saved-movies">
          <SearchForm onSubmit={handleSearchFormSubmit}/>
          <MovieCardList 
            items={dislayItems}
            isLoading={loadingStatus === 'loading'}
            onDelete={handleDelete}
          />
        </section>
      </main>
      <Footer />
      </>
  );
};