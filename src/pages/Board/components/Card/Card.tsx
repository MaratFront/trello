import React from "react";

interface CardProps {
  id: number;
  title: string;
}

function Card({ title }: CardProps) {
  return (
    <div className="card" draggable="true">
      <p className="card__title">{title}</p>
    </div>
  );
}

export default Card;
