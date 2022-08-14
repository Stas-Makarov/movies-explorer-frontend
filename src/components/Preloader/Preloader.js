import React from "react";
import "./Preloader.css";

export function Preloader() {
  return (
    <div className="preloader preloader_hide">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};
