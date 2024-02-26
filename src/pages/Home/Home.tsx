import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateBoard from "./components/Board/CreateBoard";
import Board from "../Home/components/Board/Board";
//import api from "@api/request";
import api from "../../api/request";
function Home() {
  const [homeItems, setHomeItems] = useState([]);
  const OneCardCreated = (newBoard: any) =>
    setHomeItems((prevBoard) => [...prevBoard, ...newBoard]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    async function getResponse() {
      try {
        const response: any = await api.get(`${apiUrl}/board`);
        setHomeItems(response.boards);
      } catch (error) {
        console.error(error);
      }
    }
    getResponse();
  }, []);
  return (
    <div className="home">
      <p className="home__header">Мої дошки</p>
      <div className="home__container">
        <div className="home__items">
          {homeItems.map((item: any) => {
            return (
              <Board id={item.id} title={item.title} custom={item.custom} />
            );
          })}
          <CreateBoard OneCardCreated={OneCardCreated} />
        </div>
      </div>
    </div>
  );
}

export default Home;
