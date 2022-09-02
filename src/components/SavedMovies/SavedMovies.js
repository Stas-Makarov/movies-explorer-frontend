import React, { useState, useCallback, useEffect } from "react";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { getSavedMovies, deleteSavedMovie } from '../../utils/MainApi';
import { search } from '../../utils/utils';
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
      getSavedMovies(token).then((items) => {
        setItems(items);
        setLoadingStatus('idle');
      });
    }

    getData();
  }, [token]);

  const [filter, setFilter] = useState({});

  useEffect(() => {
    setDislayItems(search(items, filter.text, filter.onlyShortMovies));
  }, [filter, items]);

  const handleSearchFormSubmit = useCallback((text, onlyShortMovies) => {
    setFilter({ text, onlyShortMovies });
  }, [setFilter]);

  const handleDelete = useCallback((id) => {
    deleteSavedMovie({ token, id }).then(() => {
      setItems((items) => items.filter((item) => item.id !== id));
    });
  }, [setItems, token]);
  
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