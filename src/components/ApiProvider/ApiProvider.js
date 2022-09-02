import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { ApiContext } from '../../contexts/ApiContext';
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

export const ApiProvider = ({ children }) => {
    const token = useAuth();
    const history = useNavigate();

    const handleUnauthorized = (status) => {
        if (status === 401) {
            history('/signin', { replace: true });
        }
    }

    const api = {
        register,
        authorize,
        getMovies,
        getSavedMovies: () => getSavedMovies(token).catch(handleUnauthorized),
        getProfile: () => getProfile(token).catch(handleUnauthorized),
        deleteMovie: (id) => deleteMovie(token, id).catch(handleUnauthorized),
        saveMovie: (movie) => saveMovie(token, movie).catch(handleUnauthorized),
        editProfile: (userData) => editProfile(token, userData).catch(handleUnauthorized),
    }

    return (
      <ApiContext.Provider value={api}>
        {children}
      </ApiContext.Provider>
    );
  };