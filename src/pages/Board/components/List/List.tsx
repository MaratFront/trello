import React, { useState, useRef } from "react";
import api from "../../../../api/request";
import ICard from "../../../../common/interfaces/ICard";
import { useParams } from "react-router-dom";
import useInput from "../CustomHooks/useInput";
import "./List.css";
import Button from "src/pages/UI/Button";
import Card from "../Card/Card";
import IList from "src/common/interfaces/IList";
function List({ listId, title, cards }: IList) {
  const [position, setPosition] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const { bind, inputValue, setInputValue } = useInput("");
  const [showButton, setShowButton] = useState(true);
  const closeButton = "/close.png";
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const [draggedListId, setDraggedListId] = useState<number | null>(null);
  const [dropCard, setDropCard] = useState(null);
  const [newCard, setNewCard] = useState<any>(cards);
  const handleDragStart = (cardId: number, listId: number) => {
    const draggedCard = cards.find((card) => card.id === cardId);
    // Проверяем, есть ли данные о карточке
    if (draggedCard) {
      // Выводим данные о карточке в консоль
      console.log("Данные о перетаскиваемой карточке:", draggedCard);
    }
    setDraggedCardId(cardId);
    setDraggedListId(listId);
    setDropCard(draggedCard);
  };
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDrop() {
    setNewCard(dropCard);
  }
  const listRef = useRef(null);
  const showInputChange = () => {
    setShowButton(false);
    setShowInput(true);
  };
  const boardId = useParams();
  const handleEnter = (
    event: React.KeyboardEvent<HTMLElement>,
    callback: () => void
  ) => event.key === "Enter" && callback();
  const apiUrl = process.env.REACT_APP_API_URL;
  function handelCancel() {
    setInputValue("");
    setShowInput(false);
    setShowButton(true);
  }
  const createCard: ICard = {
    list_id: listId,
    position: position,
    title: inputValue,
    color: "green",
    description: "dfdf",
    custom: {
      deadline: "2022-09-01",
    },
  };
  async function postRequestCard() {
    setPosition(newCard.length + 1);
    console.log(position);
    try {
      if (inputValue.trim() !== "") {
        await api.post(`${apiUrl}/board/${boardId.board_id}/card`, createCard);
        setNewCard((prevCard) => [...prevCard, createCard].reverse());
        handelCancel();
      }
      handelCancel();
    } catch (error) {
      console.error("Error post request");
    }
  }
  return (
    <div className="list">
      <div
        className="list__body"
        ref={listRef}
        style={{ position: "relative" }}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <p className="list__title">{title}</p>

        {newCard
          .sort((a, b) => a.position - b.position)
          .map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              //onePutCard={createDragCard}
              handleDragStart={handleDragStart}
              listId={listId}
              listRef={listRef}
            />
          ))}
        {showInput && (
          <>
            <input
              className="list__input"
              onKeyDown={(event) => {
                handleEnter(event, postRequestCard);
              }}
              placeholder="Введiть назву картки"
              {...bind}
              autoFocus
            />
            <div className="list__add">
              <button className="list__add--card" onClick={postRequestCard}>
                Додати картку
              </button>
              <button className="list__none--card" onClick={handelCancel}>
                <img src={closeButton} alt="" width="35px" />
              </button>
            </div>
          </>
        )}
        {showButton && (
          <Button
            eventFunction={showInputChange}
            text={"+ Додати картку"}
            className="card__button"
          />
        )}
      </div>
    </div>
  );
}
export default List;
