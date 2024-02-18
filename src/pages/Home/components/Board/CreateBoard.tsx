import React from "react";
import api from "../../../../api/request";
import { Link } from "react-router-dom";
import Board from "./Board";
import useInput from "../../../Board/components/CustomHooks/useInput";
import useAxios from "../../../Board/components/CustomHooks/useAxios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
interface IProps {
  OneCardCreated: (newBoard: object) => void;
}
export default function CreateBoard({ OneCardCreated }: IProps) {
  const [homeItems, setHomeItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { inputValue, bind, setInputValue } = useInput("");
  const openModal = () => setIsModalOpen(true);
  const closeModalOk = () => {
    setIsModalOpen(false);
    setInputValue("");
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  interface Ilist {
    id: number;
    result: string;
  }
  const createBoard = (boardId: any) => {
    const boards = [
      {
        id: boardId,
        title: inputValue,
        custom: {
          description: "dfdf",
        },
      },
    ];
    setHomeItems((prevBoards) => [...prevBoards, ...boards]);
    return OneCardCreated(homeItems);
  };
  const handleAddBoard = async () => {
    if (inputValue.trim() !== "") {
      const request: Ilist = await api.post(`${apiUrl}/board`, {
        title: inputValue,
        custom: {
          description: "desc",
        },
      });
      try {
        closeModalOk();
        createBoard(request.id);
        console.log(request);
      } catch (error) {
        console.error("Произошла ошибка при выполнении POST-запроса:", error);
      }
    }
  };
  // useEffect(() => {
  //   OneCardCreated(getResponse);
  //   async function getResponse() {
  //     const response: any = await api.get(`${apiUrl}/board`);
  //     setHomeItems(response.boards);
  //   }
  // }, []);
  const [boards] = useAxios(OneCardCreated, `${apiUrl}/board`, homeItems);
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
      {homeItems.map((item: any) => {
        return (
          <Link key={item.id} to={`/board/${item.id}`}>
            <Board id={item.id} title={item.title} custom={item.custom} />
          </Link>
        );
      })}
      {boards.map((item: any) => {
        return (
          <Link key={item.id} to={`/board/${item.id}`}>
            <Board id={item.id} title={item.title} custom={item.custom} />
          </Link>
        );
      })}
      <button className="Home__button Home__item" onClick={openModal}>
        + Створити дошку
      </button>
    </>
  );
}
