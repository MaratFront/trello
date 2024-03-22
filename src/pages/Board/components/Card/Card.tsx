import React, { useState, useEffect } from "react";
import IList from "src/common/interfaces/IList";

interface CardProps {
  id: number;
  title: string;
  listId: number;
  handleDragStart: any;
  handleDragOver: any;
  listRef: any;
  //handleDragStart: any;
  handleDragDrop: any;
}

function Card({
  id,
  title,
  listId,
  handleDragStart,
  listRef,
  handleDragDrop,
  handleDragOver,
}: CardProps) {
  const [showSlot, setShowSlot] = useState(false);
  const onDragStart = () => {
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
  const onDragEnd = () => {
    setTimeout(() => {
      setShowSlot(false);
    }, 0);
  };
  function onDragOver(e) {
    handleDragOver(e);
    e.target.style.border = "1px solid black";
  }
  function onDragEnter() {
    setTimeout(() => {
      setShowSlot(false);
    }, 0);
  }
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
        onDragEnter={onDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDragDrop}
        onDragEnd={onDragEnd}
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
