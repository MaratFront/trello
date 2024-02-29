import React from "react";
import { Link } from "react-router-dom";
interface IHome {
  id: number;
  title: string;
}
function Board({ id, title }: IHome) {
  return (
    <Link key={id} to={`/board/${id}`}>
      <div className="home__item">
        <p className="home__title">{title}</p>
      </div>
    </Link>
  );
}
export default Board;
