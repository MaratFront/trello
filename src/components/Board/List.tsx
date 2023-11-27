import React from 'react';
import '../../stylesBoard/board.css';
import Card from './Card';
//import ICard from '../interfaces/Icard';
interface IProps {
  title: string;
  cards:{title:string}[];
}
  
function List({ title, cards }: IProps) {
  return (
     <>
     <div className="Board__list">
      <p className='Board__list-title'>{title}</p>
      
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
