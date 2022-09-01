const matchName = (searchText, movie) => movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
const isShortMovie = (movie) => movie.duration <= 40;

export const search = (collection, text, onlyShortMovies) =>
    collection.filter((movie) => (!text || matchName(text, movie)) && (!onlyShortMovies || isShortMovie(movie)));

export const normalizeMovie = (movie) => ({
    id: movie._id || movie.id,
    country: movie.country || "Нет",
    director: movie.director || "Нет",
    duration: `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м` || 0,
    year: movie.year || "Нет",
    description: movie.description || "Нет",
    image:movie.image || `https://api.nomoreparties.co${movie.image.url}`,
    trailerLink: movie.trailerLink || movie.trailer,
    thumbnail:movie.thumbnail || `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU || "Нет",
    nameEN: movie.nameEN || "Нет",
  });
