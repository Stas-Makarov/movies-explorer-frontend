import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import "./MovieCardList.css";

export const MovieCardList = ({
  items,
  onDelete,
  onChangeFavorite,
  isLoading
}) => {

  if (isLoading) {
    return (
      <section className="movie-card-list">
        <Preloader isLoadingMovies={isLoading}/>
      </section>
    );
  }

  return (
    <section className="movie-card-list">
      {items.length === 0 && <span className="search-form__error">Ничего не найдено</span>}
      <ul className="movies__gallery">
        {items.map((item) => (
            <MoviesCard
              key={item.id}
              movies={item}
              onDelete={onDelete}
              onChangeFavorite={onChangeFavorite}
            />
        ))}
      </ul>
    </section>
  );
};