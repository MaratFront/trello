import React, { useRef, useState } from "react";

interface CardProps {
  id: number;
  title: string;
  handleDragLeave: any;
}

function Card({ id, title, handleDragLeave }: CardProps) {
  const [showSlot, setShowSlot] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  console.log(showSlot);
  function handelDragStart() {
    setTimeout(() => {
      setShowSlot(true);
    }, 0);
  }

  setTimeout(() => {
    setShowSlot(false);
    handleDragLeave(showSlot);
  }, 0);

  function handelDragEnd() {
    setTimeout(() => {
      setShowSlot(false);
    }, 0);
  }
  return (
    <>
      {showSlot && <div className="card__slot" />}
      <div
        className="card"
        draggable={true}
        onDragStart={handelDragStart}
        onDragEnd={handelDragEnd}
        ref={cardRef}
        style={{
          visibility: showSlot ? "hidden" : "visible",
          height: showSlot && "0",
        }}
      >
        <p className="card__title">{title}</p>
      </div>
    </>
  );
}

export default Card;
