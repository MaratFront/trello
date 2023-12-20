import React, { useEffect } from 'react';
import api from '../../api/request';
import '../../stylesBoard/board.css';
import Card from './Card';
interface IProps {
  title: string;
  cards:{title:string}[];
}
function List({ title, cards }: IProps) {
  const [inputValue, setInputValue] = React.useState(title);
  const [cardValue,setCardValue] = React.useState(false);


  return (
     <>
     <div className="Board__list">
     
      <input 
        className='Board__list-title' 
        value={inputValue}
      />
      
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
