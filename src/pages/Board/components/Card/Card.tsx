import React, { useState, useEffect } from "react";

interface CardProps {
  id: number;
  title: string;
  listId: number;
  onDrop: (id: number, listId: number) => void;
  handleDragStart: (id: number, listId: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  listRef: React.RefObject<HTMLDivElement>;
}

function Card({
  id,
  title,
  listId,
  handleDragStart,
  listRef,
  onDrop,
  handleDragOver,
}: CardProps) {
  const [showSlot, setShowSlot] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setTimeout(() => {
      setShowSlot(true);
    }, 0);
    handleDragStart(id, listId);
  };

  const onDragLeave = () => {
    setTimeout(() => {
      setShowSlot(false);
    }, 0);
  };

  const handleDrop = () => {
    onDrop(id, listId);
  };

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
        //onDragEnter={() => setShowSlot(true)}
        //onDragOver={onDragOver}
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
