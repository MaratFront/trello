import React from "react";
import { Link } from "react-router-dom";
interface IHome {
  id: number;
  title: string;
  custom: {
    background: string;
  };
}
function Board({ id, title, custom }: IHome) {
  return (
    <Link key={id} to={`/board/${id}`}>
      <div className="home__item">
        <p className="home__title">{title}</p>
      </div>
    </Link>
  );
}
export default Board;
