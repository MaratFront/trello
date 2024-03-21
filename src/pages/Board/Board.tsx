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
    setBoards((prevBoard) => [...prevBoard, newBoard]);
  const boardId = useParams();
  async function putRequest() {
    await api.put(`${apiUrl}/board/${boardId.board_id}`, {
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
        const response: any = await api.get(
          `${apiUrl}/board/${boardId.board_id}`
        );
        setBoards(response.lists.sort((a, b) => b.position - a.position));
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
          {boards.map(({ id, title, cards }) => {
            return (
              <>
                <List key={id} listId={id} title={title} cards={cards} />
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
