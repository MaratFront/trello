import React, { useState, useRef } from "react";
import "../Home/components/Board/board.css";
import useInput from "./components/CustomHooks/useInput";
import api from "../../api/request";
import { Link, useParams } from "react-router-dom";
import CreaeteBoard from "./CreateBoard";
import List from "./components/List/List";
const Board = () => {
  const [color, setColor] = useState("#ffffff");
  const [boards, setBoards] = useState([]);

  const { bind, inputValue, setInputValue } = useInput("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const changeBackground = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColor(event.target.value);
  const apiUrl = process.env.REACT_APP_API_URL;
  const OneBoardCreated = (newBoard: any) => setBoards(newBoard);
  const id = useParams();
  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }
  async function putResponse() {
    await api.put(`${apiUrl}/board/${parseInt(id.board_id)}`, {
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
          `${apiUrl}/board/${parseInt(id.board_id)}`
        );
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
    <div className="Board" style={{ backgroundColor: color }}>
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
            onKeyDown={(event) => handleEnter(event)}
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
              onKeyDown={(event) => handleEnter(event)}
            />
          </div>
        </header>
        <section className="Board__section" style={{ overflowX: "auto" }}>
          {boards
            .sort((a: number, b: number) => a - b)
            .map((item: any) => {
              return (
                <List
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  cards={item.cards}
                />
              );
            })}
          <CreaeteBoard OneBoardCreated={OneBoardCreated} />
        </section>
      </div>
    </div>
  );
};

export default Board;
