import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import "./MovieCardList.css";
export const MovieCardList = () => {
  return (
    <section className="movie-card-list">
      <Preloader />
      <span className="search-form__error">
        "Ничего не найдено"
      </span>
      <ul className="movies__gallery">
        <MoviesCard />
      </ul>
    </section>
  );
};