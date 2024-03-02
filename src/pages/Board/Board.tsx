import React, { useState, useRef } from "react";
import "../Home/components/Board/board.css";
import useInput from "./components/CustomHooks/useInput";
import api from "../../api/request";
import { useParams } from "react-router-dom";
import CreaeteBoard from "./CreateBoard";
import BoardTitle from "./BoardTitle/BoardTitle";
import BoardBackground from "./BoardBackground/BoardBackground";
import List from "./components/List/List";
const Board = () => {
  const [color, setColor] = useState("#ffffff");
  const [boards, setBoards] = useState<any>([]);

  const { bind, inputValue, setInputValue } = useInput("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changeBackground = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColor(event.target.value);
  const apiUrl = process.env.REACT_APP_API_URL;
  const OneBoardCreated = (newBoard: any) =>
    setBoards((prevBoard) => [...prevBoard, ...newBoard]);
  const OneCardCreated = (newCard: any) =>
    setBoards((prevCard) => [...prevCard.cards, ...newCard]);

  const id = useParams();
  async function putRequest() {
    await api.put(`${apiUrl}/board/${id.board_id}`, {
      title: inputValue,
      custom: {
        description: "desc",
        color: color,
      },
    });
  }
  React.useEffect(() => {
    async function getResponse() {
      try {
        const response: any = await api.get(`${apiUrl}/board/${id.board_id}`);
        setBoards(response.lists);
        setInputValue(response.title);
        setColor(response.custom.color);
      } catch (error: any) {
        throw new Error(error);
      }
    }
    getResponse();
  }, []);
  return (
    <div className="board" style={{ backgroundColor: color }}>
      <div className="container">
        <header className="board__header">
          <BoardTitle inputRef={inputRef} bind={bind} putRequest={putRequest} />
          <BoardBackground
            putRequest={putRequest}
            color={color}
            changeBackground={changeBackground}
          />
        </header>
        <section className="board__section" style={{ overflowX: "auto" }}>
          {boards
            .sort((a: number, b: number) => a - b)
            .map((item: any) => {
              return (
                <>
                  <List
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    cards={item.cards}
                    OneCardCreated={OneCardCreated}
                  />
                </>
              );
            })}
          <CreaeteBoard OneBoardCreated={OneBoardCreated} />
        </section>
      </div>
    </div>
  );
};

export default Board;
