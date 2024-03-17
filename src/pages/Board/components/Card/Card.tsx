import React, { useRef, useState, useEffect } from "react";

interface CardProps {
  id: number;
  title: string;
  onePutCard: (newCard: any) => void;
  leaveCard: (newCard: any) => void;
}

function Card({ id, title, onePutCard, leaveCard }: CardProps) {
  const [showSlot, setShowSlot] = useState(false);
  const [cardData, setCardData] = useState({});
  const cardRef = useRef<HTMLDivElement>(null);
  function handelDragStart(cardId, title) {
    setCardData({
      id: cardId,
      title: title,
      color: "green",
      description: "dfdf",
      custom: {
        deadline: "2022-09-01",
      },
    });

    setTimeout(() => {
      setShowSlot(true);
    }, 0);
    handelDragLeave;
  }
  function handelDragLeave(e) {
    e.preventDefault();
    setTimeout(() => {
      leaveCard(false);
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
