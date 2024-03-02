import React, { useEffect, useState } from "react";
import CreateBoard from "./components/Board/CreateBoard";
import Board from "../Home/components/Board/Board";
//import api from "@api/request";
import api from "../../api/request";
function Home() {
  const [homeItems, setHomeItems] = useState([]);
  const OneCardCreated = (newCard: any) =>
    setHomeItems((prevCard) => [...prevCard, ...newCard]);
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
          {homeItems.map((item) => {
            return <Board key={item.id} id={item.id} title={item.title} />;
          })}
          <CreateBoard OneCardCreated={OneCardCreated} />
        </div>
      </div>
    </div>
  );
}

export default Home;
