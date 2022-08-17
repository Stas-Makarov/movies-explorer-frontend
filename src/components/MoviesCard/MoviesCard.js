import React from "react";
import "./MoviesCard.css";
import cardImage from "../../images/card.png"

export const MoviesCard = () => {

  return (
    <>
      <li className="card">
      <div className="card__head">
        <div className="card__name">
          <p className="card__title">33 слова о дизайне</p>
          <p className="card__duration">1ч 47мин</p>
        </div>
        <button
          type="button"
          className="card__delete"
          ></button>
      </div>
      <img
        className="card__image"
        alt="movie"
        src={cardImage}
      />
    </li>
    <li className="card">
      <div className="card__head">
        <div className="card__name">
          <p className="card__title">33 слова о дизайне</p>
          <p className="card__duration">1ч 47мин</p>
        </div>
        <button
          type="button"
          className="card__delete"
          ></button>
      </div>
      <img
        className="card__image"
        alt="movie"
        src={cardImage}
      />
    </li>
    <li className="card">
      <div className="card__head">
        <div className="card__name">
        <p className="card__title">33 слова о дизайне</p>
        <p className="card__duration">1ч 47мин</p>
      </div>
      <button
        type="button"
        className="card__delete"
        ></button>
    </div>
    <img
      className="card__image"
      alt="movie"
      src={cardImage}
    />
  </li>
    </>
  );
};