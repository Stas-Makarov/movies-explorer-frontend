import React, {useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from '../../contexts/ApiContext';
import { useUser } from '../../hooks/useUser';
import {
    register,
    authorize,
    getMovies,
    getSavedMovies,
    getProfile,
    deleteMovie,
    saveMovie,
    editProfile,
} from '../../services/api';

import { SIGNIN_ROUTE } from '../../constants';

export const ApiProvider = ({ children }) => {
    const history = useNavigate();
    const { setUser } = useUser();
    const [unauthorized, setUnauthorized] = useState(false);

    useLayoutEffect(() => {
      if (unauthorized) {
        setUnauthorized(false);
        setUser(null);
        history(SIGNIN_ROUTE, { replace: true });
      }
    }, [setUser, history, setUnauthorized, unauthorized]);

    const handleUnauthorized = (status) => {
        if (status === 401) {
            setUnauthorized(true);          
            return Promise.reject(status);
        }
    }

    const api = {
        register,
        authorize,
        getMovies: () => getMovies().catch(handleUnauthorized),
        getSavedMovies: () => getSavedMovies().catch(handleUnauthorized),
        getProfile: () => getProfile().catch(handleUnauthorized),
        deleteMovie: (id) => deleteMovie(id).catch(handleUnauthorized),
        saveMovie: (movie) => saveMovie(movie).catch(handleUnauthorized),
        editProfile: (userData) => editProfile(userData).catch(handleUnauthorized),
    }

    return (
      <ApiContext.Provider value={api}>
        {children}
      </ApiContext.Provider>
    );
  };