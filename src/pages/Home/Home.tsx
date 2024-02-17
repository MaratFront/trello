import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateBoard from "./components/Board/CreateBoard";
function Home() {
  const [homeItems, setHomeItems] = useState([]);
  const OneCardCreated = (newBoard: any) => setHomeItems(newBoard);
  return (
    <div className="Home">
      <p className="Home__header">Мої дошки</p>
      <div className="Home__container">
        <div className="Home__items">
          <CreateBoard OneCardCreated={OneCardCreated} />
        </div>
      </div>
    </div>
  );
}

export default Home;
