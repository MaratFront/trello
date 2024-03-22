import React, { useState, useEffect } from "react";

interface CardProps {
  id: number;
  title: string;
  listId: number;
  onDrop;
  handleDragStart: any;
  handleDragOver: any;
  listRef: any;
  //handleDragDrop: any;
}

function Card({
  id,
  title,
  listId,
  handleDragStart,
  listRef,
  onDrop,
  //handleDragDrop,
  handleDragOver,
}: CardProps) {
  const [showSlot, setShowSlot] = useState(false);

  const onDragStart = () => {
    setTimeout(() => {
      setShowSlot(true);
    }, 0);
    handleDragStart(id, listId); // Передаем информацию о карточке и списке при начале перетаскивания
  };

  const onDragLeave = () => {
    setTimeout(() => {
      setShowSlot(false);
    }, 0);
  };

  const onDragOver = (e: any) => {
    handleDragOver(e);
    e.preventDefault(); // Предотвращаем действие по умолчанию
    e.target.style.border = "1px solid black";
  };
  const handleDrop = () => {
    onDrop(id, listId);
  };
  // const onDrop = () => {
  //   setTimeout(() => {
  //     setShowSlot(false);
  //   }, 0);

  // };

  useEffect(() => {
    listRef.current.addEventListener("dragleave", onDragLeave);
    return () => {
      listRef.current.removeEventListener("dragleave", onDragLeave);
    };
  }, []);

  return (
    <>
      {showSlot && <div className="card__slot" />}
      <div
        className="card"
        draggable={true}
        onDragStart={onDragStart}
        onDragEnter={() => setShowSlot(false)}
        onDragOver={onDragOver}
        onDrop={handleDrop}
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
