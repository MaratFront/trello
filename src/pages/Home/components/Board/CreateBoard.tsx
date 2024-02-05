import React from "react";
import api from "../../../../api/request";
import { Link } from "react-router-dom";
import Board from "./Board";
import useAxios from "../../../Board/components/CustomHooks/useAxios";
import useInput from "../../../Board/components/CustomHooks/useInput";
import { useState, useEffect } from "react";
interface IProps {
  OneCardCreated: (newBoard: object) => void;
}
export default function CreateBoard({ OneCardCreated }: IProps) {
  const [homeItems, setHomeItems] = useState({});
  const [createBoard, setCreateBoard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { inputValue, bind, setInputValue } = useInput("");
  const openModal = () => setIsModalOpen(true);
  const closeModalOk = () => {
    setIsModalOpen(false);
    setInputValue("");
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleAddBoard = async () => {
    setCreateBoard(false);
    if (inputValue.trim() !== "") {
      await api.post(`${apiUrl}/board`, {
        title: inputValue,
        custom: {
          description: "desc",
        },
      });
      try {
        closeModalOk();
        setCreateBoard(true);
      } catch (error) {
        console.error("Произошла ошибка при выполнении POST-запроса:", error);
      }
    }
  };
  const [boards] = useAxios(
    OneCardCreated,
    `${apiUrl}/board`,
    homeItems,
    createBoard
  );
  return (
    <>
      {isModalOpen && (
        <div className="Home__modal-overlay">
          <div className="Home__modal-window">
            <div className="Home__modal-header">
              <input
                className="Home__modal-item Home__modal-input"
                placeholder="Введiть назву дошки"
                type="text"
                {...bind}
                autoFocus
              />
              <div className="Home__modal-items"></div>
              <button
                className="Home__modal-item Home__modal-button"
                onClick={handleAddBoard}
              >
                Додати дошку
              </button>
              <input
                className="Home__modal-close"
                type="button"
                value="Вийти"
                onClick={closeModalOk}
              />
            </div>
          </div>
        </div>
      )}
      {Object.values(boards).map((item: any) => {
        return item.map((itemResult: any) => (
          <Link key={itemResult.id} to={`/board/${itemResult.id}`}>
            <Board
              id={itemResult.id}
              title={itemResult.title}
              custom={{ background: itemResult.custom.description }}
            />
          </Link>
        ));
      })}
      <button className="Home__button Home__item" onClick={openModal}>
        + Створити дошку
      </button>
    </>
  );
}
