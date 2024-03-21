import React, { useState, useEffect } from "react";
import IList from "src/common/interfaces/IList";

interface CardProps {
  id: number;
  title: string;
  listId: number;
  handleDragStart: any;
  //handleDragStart: any;
  handleDragDrop: any;
}

function Card({
  id,
  title,
  listId,
  handleDragStart,
  handleDragDrop,
}: CardProps) {
  const [showSlot, setShowSlot] = useState(false);
  const onDragStart = () => {
    setTimeout(() => {
      setShowSlot(true);
    }, 0);
    handleDragStart(id, listId);
  };
  const onDragEnd = () => {
    setTimeout(() => {
      setShowSlot(false);
    }, 0);
  };
  function onDragOver(e) {
    e.preventDefault();
  }
  return (
    <>
      {showSlot && <div className="card__slot" />}
      <div
        className="card"
        draggable={true}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={handleDragDrop}
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
