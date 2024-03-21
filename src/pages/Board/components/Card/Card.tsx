import React, { useState, useEffect } from "react";
import IList from "src/common/interfaces/IList";

interface CardProps {
  id: number;
  title: string;
  handleDragStart: any;
  listId: number;
  listRef: any;
}

function Card({ id, title, listRef, handleDragStart, listId }: CardProps) {
  const [showSlot, setShowSlot] = useState(false);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const cardId = id;
    handleDragStart(cardId, listId);
    setInterval(() => {
      setShowSlot(true);
    }, 0);
  };
  const onDragEnd = () => {
    setShowSlot(false);
  };
  return (
    <>
      {showSlot && <div className="card__slot" />}
      <div
        className="card"
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        //onDragLeave={handleDragLeave}
        style={{
          visibility: showSlot ? "hidden" : "visible",
          height: showSlot ? "0" : "auto",
        }}
      >
        <p className="card__title">{title}</p>
      </div>
    </>
  );
}

export default Card;
