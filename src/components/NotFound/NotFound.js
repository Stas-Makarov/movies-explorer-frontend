import { useNavigate } from "react-router-dom";

import "./NotFound.css";

export function NotFound() {
  const history = useNavigate();
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" type="button" onClick={() => history(-1)}>Назад</button>
    </section>
  );
};
