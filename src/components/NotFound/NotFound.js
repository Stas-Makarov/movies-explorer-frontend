import "./NotFound.css";

export function NotFound() {
  function back() {
    window.history.back();
  }
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" type="button" onClick={back}>Назад</button>
    </section>
  );
};
