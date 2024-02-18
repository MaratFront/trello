import React, { ChangeEvent, useEffect, useState } from "react";
import api from "../../../../api/request";
import ICard from "../../../../common/interfaces/ICard";
import { dragOnDrop } from "../dragOnDrop/dragOnDrop";
import { useParams } from "react-router-dom";
import useInput from "../CustomHooks/useInput";
import Card from "../Card/Card";
interface IProps {
  id: number | string;
  title: string;
  cards: { id: number; title: string }[];
}
function List({ id, title, cards }: IProps) {
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
  const handleEnter = (
    event: React.KeyboardEvent<HTMLElement>,
    callback: () => void
  ) => event.key === "Enter" && callback();
  const apiUrl = process.env.REACT_APP_API_URL;
  function createList() {
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
    setCard((prevCard: any) => [...prevCard, ...createCard]);
  }
  async function postResponseCard() {
    setPosition(position + 1);
    try {
      if (inputValue.trim() !== "") {
        await api.post(`${apiUrl}/board/${parseInt(boardId.board_id)}/card`, {
          title: inputValue,
          list_id: id,
          position: position,
          description: "washing process",
          custom: {
            deadline: "2022-08-31 12:00",
          },
        });
        createList();
        setShowButton(true);
        setInputValue("");
        setShowInput(false);
      }
    } catch (error) {
      console.error("Error post request");
      setInputValue("");
      setShowInput(false);
      setShowButton(true);
    }
  }
  function handelCancel() {
    setInputValue("");
    setShowInput(false);
    setShowButton(true);
  }
  useEffect(() => {
    dragOnDrop();
  }, []);
  return (
    <div className="Board__list">
      <p className="Board__list-title">{title}</p>
      {card.map((card: any) => (
        <Card key={card.id} id={card.id} title={card.title} />
      ))}
      {cards.map((card) => (
        <Card key={card.id} id={card.id} title={card.title} />
      ))}
      {showInput && (
        <>
          <input
            className="Board__list-input"
            onKeyDown={(event) => {
              handleEnter(event, postResponseCard);
            }}
            placeholder="Введiть назву картки"
            {...bind}
            autoFocus
          />
          <div className="Board__add">
            <button className="Board__add-card" onClick={postResponseCard}>
              Додати картку
            </button>
            <button className="Board__none-card" onClick={handelCancel}>
              <img src={closeButton} alt="" width="35px" />
            </button>
          </div>
        </>
      )}
      {showButton && (
        <button
          className="Board__list-button"
          type="submit"
          onClick={showInputChange}
        >
          + Додати картку
        </button>
      )}
    </div>
  );
}
export default List;
