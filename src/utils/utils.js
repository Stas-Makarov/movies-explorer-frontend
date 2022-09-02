const matchName = (searchText, movie) => movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
const isShortMovie = (movie) => movie.duration <= 40;

export const search = (collection, text, onlyShortMovies) =>
    collection.filter((movie) => (!text || matchName(text, movie)) && (!onlyShortMovies || isShortMovie(movie)));

export const normalizeMovie = (movie) => ({
    id: movie._id || movie.id,
    movieId: movie.movieId || Number(movie.id),
    country: movie.country || "Нет",
    director: movie.director || "Нет",
    duration: movie.duration || 0,
    year: movie.year || "Нет",
    description: movie.description || "Нет",
    image: typeof movie.image === 'string' ? movie.image : `https://api.nomoreparties.co${movie.image.url}`,
    trailerLink: movie.trailerLink || movie.trailer,
    thumbnail: typeof movie.thumbnail === 'string' ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU || "Нет",
    nameEN: movie.nameEN || "Нет",
    owner: movie.owner,
});

export const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } 
  
    return Promise.reject(res.status);
};
