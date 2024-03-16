import React, { useRef, useState, useEffect } from "react";

interface CardProps {
  id: number;
  title: string;
  onePutCard: (newCard: any) => void;
}

function Card({ id, title, onePutCard }: CardProps) {
  const [showSlot, setShowSlot] = useState(false);
  const [cardData, setCardData] = useState({ id: 0, title: "sdfsf" });
  const cardRef = useRef<HTMLDivElement>(null);
  function handelDragStart(cardId, title) {
    setCardData({ id: cardId, title: title });
    setTimeout(() => {
      setShowSlot(true);
    }, 0);
  }
  function handleDrop(e) {
    e.preventDefault();
    onePutCard(cardData);
    console.log(cardData);
  }
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
        onDragStart={() => handelDragStart(id, title)}
        onDrop={handleDrop}
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
