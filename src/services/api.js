import { normalizeMovie, handleResponse } from '../utils/utils';

const BASE_URL = 'https://api.s.d.domainname.students.nomoredomains.xyz';

const BEATFILM_URL = "https://api.nomoreparties.co/beatfilm-movies";


export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
      name,
    }),
    credentials: 'include',
  }).then((res) => handleResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
    credentials: 'include',
  }).then((res) => handleResponse(res));
};


export const getProfile = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    credentials: 'include',
  }).then((res) => handleResponse(res));
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
  .then((res) => handleResponse(res))
  .then((items) => items.map(normalizeMovie));
};

export function getMovies() {
  return Promise.all([
    fetch(BEATFILM_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => handleResponse(res))
    .then((items) => items.map(normalizeMovie)),
    getSavedMovies()
  ]).then(([movies, savedMovies]) => {
      const savedMovieMap = new Map();
      
      savedMovies.forEach((movie) => {
        savedMovieMap.set(movie.movieId, movie);
      });

      const res = movies.map((movie) => savedMovieMap.get(movie.movieId) || movie);

      return res;
    });
};

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
  })
  .then((res) => handleResponse(res))
  .then((res) => {    
    const searchResult = localStorage.getItem('searchResult');
    if (searchResult) {
      const parsedSearchResult = JSON.parse(searchResult);
      const savedMovieIndex = parsedSearchResult.items.findIndex((item) => item.id === id);
      if (savedMovieIndex !== -1) {
        parsedSearchResult.items[savedMovieIndex] = {
          ...parsedSearchResult.items[savedMovieIndex],
          owner: undefined
        };
        localStorage.setItem('searchResult', JSON.stringify(parsedSearchResult));
      }
    }
  });
};

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: String(movie.movieId),
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
    credentials: 'include',
  })
  .then((res) => handleResponse(res))
  .then((data) => {
    const savedMovie = normalizeMovie({...data, movieId: movie.movieId});

    const searchResult = localStorage.getItem('searchResult');
    if (searchResult) {
      const parsedSearchResult = JSON.parse(searchResult);
      const savedMovieIndex = parsedSearchResult.items.findIndex((item) => item.movieId === savedMovie.movieId);
      if (savedMovieIndex !== -1) {
        parsedSearchResult.items[savedMovieIndex] = savedMovie;
        localStorage.setItem('searchResult', JSON.stringify(parsedSearchResult));
      }
    }
    return savedMovie;
  });
};

export const editProfile = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
    }),
    credentials: 'include',
  }).then((res) => handleResponse(res));
};
