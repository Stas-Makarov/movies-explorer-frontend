import React, { useState } from "react";
import { useUser } from '../../hooks/useUser';
import "./MoviesCard.css";

export const MoviesCard = ({
  movie,
  onDelete,
  onChangeFavorite
}) => {
  const currentUser = useUser();
  const [liked, setLiked] = useState(currentUser._id === movie.owner);

  function handleChangeFavorite() {
    const currentLiked = !liked;
    setLiked(currentLiked);
    onChangeFavorite(movie.movieId, currentLiked);
  }

  return (
    <li className="card" id={movie.id}>
      <div className="card__head">
        <div className="card__name">
          <p className="card__title">{movie.nameRU}</p>
          <p className="card__duration">{`${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
        </div>
        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(movie.id)}
            className="card__delete"
          ></button>
        ) : (
          <button
            type="button"
            onClick={handleChangeFavorite}
            className={`card__like ${liked ? "card__like_active" : " "}`}
          ></button>
        )}
      </div>
      <a
        href={movie.trailerLink}
        className="card__trailer"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt={movie.nameRU}
          src={movie.image}
        />
      </a>
    </li>
  );
};