import { normalizeMovie, handleResponse } from './utils';

const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export function getInitialMovies() {
  return fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => handleResponse(res))
  .then((items) => items.map(normalizeMovie));
}