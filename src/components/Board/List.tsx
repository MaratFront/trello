import React, { useEffect,useState } from 'react';
import api from '../../api/request';
import '../../stylesBoard/board.css';
import {Link} from "react-router-dom";
import Card from './Card';
interface IProps {
  id:number,
  title: string;
  cards:{id:number,title:string}[];
}
interface CardType{
  title: string,
  list_id: number,
  position: number,
  description: string,
  custom: {
    deadline: string,
  }
}
function List({id,title, cards }: IProps) {
  //const [inputValue, setInputValue] = useState(title);
  const [showInput,setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showButton,setShowButton] = useState(true);
  const [card,setCard]=useState<CardType>();
  const handleInputChange=(event:any)=>setInputValue(event.target.value);
  
  const showInputChange=()=>{
    setShowButton(false);
    setShowInput(true)
  }
  const id2 = window.location.pathname.split("/").pop();
  async function postResponse(){
    try{
      if(inputValue.trim()!==""){
        await api.post(`https://trello-back.shpp.me/maliiev/api/v1/board/${id2}/card`,{
          title: inputValue,
          list_id: 2,
          position: 5,
          description: "washing process",
          custom: {
            deadline: "2022-08-31 12:00"
          }
        });

      }

    }catch(error){
      console.error('Error post request');
    }

  }


  return (
     <>
     <div className="Board__list">
      <p className='Board__list-title'>{title}</p>
      <div className="Board__list-card">
        {cards.map((card)=>(
            <Card id={card.id} title={card.title}/>
        ))}
        {
        showInput &&(
          <>
            <input className='Board__list-input' value={inputValue} onChange={handleInputChange} autoFocus/>
            <div className='Board__add'>
              <button className='Board__add-card' onClick={postResponse}>Додати картку</button>
              <button className='Board__none-card'>Скасувати</button>
            </div>
          </>
        )
        }
        {showButton&&<button className="Board__list-button" type="submit" onClick={showInputChange}>+ Додати картку</button>}
      </div>
     
    </div>
    
  </>  
  );
}

export default List;
