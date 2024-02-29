import React, { ChangeEvent, useEffect, useState } from "react";
import api from "../../../../api/request";
import ICard from "../../../../common/interfaces/ICard";
import { useParams } from "react-router-dom";
import useInput from "../CustomHooks/useInput";
import "./List.css";
import Button from "src/pages/UI/Button";
import Card from "../Card/Card";
import IList from "src/common/interfaces/IList";
function List({ id, title, cards }: IList) {
  const [position, setPosition] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const { bind, inputValue, setInputValue } = useInput("");
  const [card, setCard] = useState<any>([]);
  const [showButton, setShowButton] = useState(true);
  const closeButton = "/close.png";
  const showInputChange = () => {
    setShowButton(false);
    setShowInput(true);
  };
  const boardId = useParams();
  const resultId = parseInt(boardId.board_id);
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
  function createCard() {
    const createCard: ICard[] = [
      {
        id: id,
        title: inputValue,
        color: "green",
        description: "dfdf",
        custom: {
          deadline: "2022-09-01",
        },
        users: [1],
        created_at: 1662016083025,
      },
    ];
    setCard((prevCard: any) => {
      if (inputValue.trim() !== "") {
        return [...prevCard, ...createCard];
      }
      return;
    });
  }
  async function postRequestCard() {
    setPosition(position + 1);
    try {
      if (inputValue.trim() !== "") {
        await api.post(`${apiUrl}/board/${resultId}/card`, {
          title: inputValue,
          list_id: id,
          position: position,
          description: "washing process",
          custom: {
            deadline: "2022-08-31 12:00",
          },
        });
        createCard();
        handelCancel();
      } else {
        handelCancel();
      }
    } catch (error) {
      console.error("Error post request");
      handelCancel();
    }
  }
  return (
    <div className="list">
      <div className="list__body">
        <p className="list__title">{title}</p>
        {card.map((card: any) => (
          <Card key={card.id} id={card.id} title={card.title} />
        ))}
        {cards.map((card) => (
          <Card key={card.id} id={card.id} title={card.title} />
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
