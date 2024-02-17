import React from "react";
interface IHome {
  id: number;
  title: string;
  custom: {
    background: string;
  };
}
function Board({ id, title, custom }: IHome) {
  return (
    <div className="Home__item">
      <p className="Home__title">{title}</p>
    </div>
  );
}
export default Board;
