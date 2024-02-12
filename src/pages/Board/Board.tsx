import React, { useState, useRef } from "react";
import "../Home/components/Board/board.css";
import useInput from "./components/CustomHooks/useInput";
import api from "../../api/request";
import { Link, useParams } from "react-router-dom";
import CreaeteBoard from "./CreateBoard";
import List from "./components/List/List";
const Board = () => {
  const [color, setColor] = useState<any>(null);
  const [boards, setBoards] = useState<any>([]);
  const { bind, inputValue, setInputValue } = useInput("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changeBackground = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColor(event.target.value);
  const apiUrl = process.env.REACT_APP_API_URL;
  const OneBoardCreated = (newBoard: any) => setBoards(newBoard);
  const id = useParams();
  function handleEnter(
    event: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) {
    if (event.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
        callback();
      }
    }
  }
  async function putResponse() {
    await api.put(`${apiUrl}/board/${id.board_id}`, {
      title: inputValue,
      custom: {
        description: "desc",
        color: color,
      },
    });
  }
  // React.useEffect(() => {
  //   async function getResponse() {
  //     try {
  //       const response: any = await api.get(`${apiUrl}/board/${id.board_id}`);
  //       setInputValue(response.title);
  //       setColor(response.custom.color);
  //       setBoards(response.lists);
  //     } catch (error: any) {
  //       throw new Error(error);
  //     }
  //   }
  //   getResponse();
  // }, []);
  return (
    <div className="Board" style={{ background: color }}>
      <div className="container">
        <header className="Board__header">
          <Link to="/">
            <button className="Board__header-btn btn" type="submit">
              &#8592; домой
            </button>
          </Link>
          <input
            ref={inputRef}
            className="Board__header-title"
            type="text"
            {...bind}
            onKeyDown={(event) => handleEnter(event, putResponse)}
            onBlur={putResponse}
          />
          <div className="Board__color-items">
            <button className="Board__background-btn btn" onClick={putResponse}>
              Змiнити колiр фону
            </button>
            <input
              type="color"
              className="Board__header-background"
              value={color}
              onChange={changeBackground}
              onKeyDown={(event) => handleEnter(event, putResponse)}
            />
          </div>
        </header>
        <section className="Board__section">
          <CreaeteBoard OneBoardCreated={OneBoardCreated} />
        </section>
      </div>
    </div>
  );
};

export default Board;
