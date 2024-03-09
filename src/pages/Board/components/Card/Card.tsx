import React, { useRef, useState } from "react";

interface CardProps {
  id: number;
  title: string;
}

function Card({ id, title }: CardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  function handelDragStart() {
    setTimeout(() => {
      setIsDragging(true);
    }, 50);
  }
  function handelDragEnd() {
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  }
  return (
    <>
      {isDragging && <div className="card__slot" />}
      <div
        className="card"
        draggable={true}
        onDragStart={handelDragStart}
        onDragEnd={handelDragEnd}
        ref={cardRef}
        style={{
          visibility: isDragging ? "hidden" : "visible",
          height: isDragging && "0",
        }}
      >
        <p className="card__title">{title}</p>
      </div>
    </>
  );
}

export default Card;
