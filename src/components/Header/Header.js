import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import "./Header.css";

export function Header(props) {
  return (
    <header className="header">
      <Link className="header__logo" to="/"></Link>
      <Navigation />
    </header>
  );
};

