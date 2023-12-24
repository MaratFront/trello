import React, { useEffect } from 'react';
import api from '../../api/request';
import '../../stylesBoard/board.css';
import Card from './Card';
import { useState } from 'react';
interface IProps {
  id:number,
  title: string;
  cards:{title:string}[];
}
function List({id, title, cards }: IProps) {
  const [inputValue, setInputValue] = useState(title);
  const [cardValue,setCardValue] = useState(false);


  return (
     <>
     <div className="Board__list">
      <div className="Board__list-card">
        {cards.map((card)=>(
          <Card title={card.title}/>
          
        ))}
        <button className="Board__list-button" type="submit">+ Додати картку</button>
      </div>
     
    </div>
    
  </>  
  );
}

export default List;
