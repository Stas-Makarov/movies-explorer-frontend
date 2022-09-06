import React, { useState, useCallback, useEffect } from "react";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { search } from '../../utils/utils';
import { useApi } from '../../hooks/useApi'; 
import "./SavedMovies.css";

export const SavedMovies = () => {
  const [items, setItems] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const [dislayItems, setDislayItems] = useState([]);
  const api = useApi();

  useEffect(() => {
    const getData = () => {
      setLoadingStatus('loading');
      api.getSavedMovies().then((items) => {
        setItems(items);
        setLoadingStatus('idle');
      });
    }

    getData();
  }, [api]);

  const [filter, setFilter] = useState({});

  useEffect(() => {
    setDislayItems(search(items, filter.text, filter.onlyShortMovies));
  }, [filter, items]);

  const handleSearchFormSubmit = useCallback((text, onlyShortMovies) => {
    setFilter({ text, onlyShortMovies });
  }, [setFilter]);

  const handleDelete = useCallback((id) => {
    api.deleteMovie(id).then(() => {
      setItems((items) => items.filter((item) => item.id !== id));
    });
  }, [setItems, api]);
  
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