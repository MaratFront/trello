import React, { useRef, useState, useEffect } from "react";

interface CardProps {
  id: number;
  title: string;
  onePutCard: (newCard: any) => void;
  listRef: any;
}

function Card({ id, title, onePutCard, listRef }: CardProps) {
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
  }
  function handleDragLeave() {
    setTimeout(() => {
      setShowSlot(false);
    }, 1000);
  }
  function handleDragEnter(e) {
    e.preventDefault();
    setShowSlot(true);
  }
  useEffect(() => {
    console.log(listRef);
    listRef.current.addEventListener("dragleave", handleDragLeave, (e) =>
      e.preventDefault()
    );
    listRef.current.addEventListener("dragenter", handleDragEnter, () => {
      // cardRef.current.childNodes.forEach((item) => {
      //   item.addEventListener("dragenter", handleDragEnter);
      // });
    });
    // return () => {
    //   listRef.current.removeEventListener("dragleave", handleDragLeave, (e) =>
    //     e.preventDefault()
    //   );
    //   cardRef.current.removeEventListener("dragenter", handleDragEnter);
    // };
  }, []);
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
