import React, { useState, useRef } from "react";
import api from "../../../../api/request";
import ICard from "../../../../common/interfaces/ICard";
import { useParams } from "react-router-dom";
import useInput from "../CustomHooks/useInput";
import "./List.css";
import Button from "src/pages/UI/Button";
import Card from "../Card/Card";
import IList from "src/common/interfaces/IList";
function List({ boards, listId, title, cards }: IList) {
  const [position, setPosition] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const { bind, inputValue, setInputValue } = useInput("");
  const [showButton, setShowButton] = useState(true);
  const closeButton = "/close.png";
  const [newCard, setNewCard] = useState<any>(cards);
  const [currentBoard, setCurrentBoard] = useState<any[]>(null);
  const [currentCard, setCurrentCard] = useState<any>();
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
  function handleDragStart(cardId, listId) {
    setCurrentCard(cards.find((c) => c.id === cardId));
    setCurrentBoard(boards.find((l) => l.id === listId));

    console.log(currentCard, currentBoard);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function dropHandler(e) {
    e.preventDefault();
    setNewCard(currentCard);
  }
  return (
    <div className="list">
      <div
        className="list__body"
        ref={listRef}
        onDragOver={handleDragOver}
        onDrop={dropHandler}
        style={{ position: "relative" }}
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
              handleDragDrop={dropHandler}
              handleDragStart={handleDragStart}
              listId={listId}
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
