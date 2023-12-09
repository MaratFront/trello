import React, { useState,useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import '../../stylesBoard/board.css';
import List from './List';
import dragOnDrop from './dragOnDrop';
function Board(){ 
  const [title, setTitle]=useState("Моя тестова дошка");
  const [lists, setLists]=useState(
  [
    {
      id: 1,
      title: "Плани",
      cards: [
        {id: 1, title: "помити кота"},
        {id: 2, title: "приготувати суп"},
        {id: 3, title: "сходити в магазин"},
      ]
    },
    {
      id: 2,
      title: "В процесі",
      cards: [
        {id: 4, title: "подивитися серіал"},
      ]
    },
    {
      id: 3,
      title: "Зроблено",
      cards: [
        {id: 5, title: "зробити домашку"},
        {id: 6, title: "погуляти з собакой"}, 
      ]
    }
  ]

)

useEffect(()=>{
  dragOnDrop();
},[])
  return(
      <div className="Board">
        <div className='container'>
        <header className='Board__header'>
          <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          <p className='Board__header-title'>{title}</p>
          <div className='Board__header-block'></div>
        </header>
        <section className='Board__section'>
          {lists.map((list)=>(
            <List title={list.title} cards={list.cards}/>
          ))}
          {}
          <div className='Board__list' draggable="true">
            <input className="Board__section-btn" type='submit' value="+ Додати список"></input>
          </div>
          
        </section>
      </div>
      <script src="/path/to/drag-on-drop.js"></script>
    </div>
    
    );
}
export default Board;