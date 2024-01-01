import React, { useState, useEffect,useRef } from 'react';
import '../../stylesBoard/board.css';
import List from './List';
import api from '../../api/request';
import {Link} from "react-router-dom"
import dragOnDrop from './dragOnDrop';
interface BoardType{
  title:string,
  custom:{
    description:string;
  },
  users:[
    {id:number,username:"dff"}
  ],
  lists:[{
    id:number,
    cards:[{
      id:number,
      title:string,
      color:string,
      description:string,
      custom: {
        deadline: string
      },
      users: [number],
      created_at: number,
    }]
  }]
};
function Board() {
  const [title, setTitle] = useState("Моя тестова дошка");
  const [listCreate, setListCreate] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState<BoardType>();
  const [position, setPosition] = useState(1);
  const inputRef=useRef(null);
  function handleInputChange(event:any) {
    setInputValue(event.target.value);
  }
  function renameBoard(event:any) {
    setTitle(event.target.value);
  }
  function handleCreateButton(){
    setListCreate(true);
    setButtonHidden(false);
  }
  const handleCloseButton=()=>{
    setListCreate(false);
    setButtonHidden(true);
  }
  const closeButton = '/close.png';
  const id = window.location.pathname.split("/").pop();
  async function postResponse() {
    setPosition(position+1);
    try {
      if(inputValue.trim()!==""){
        await api.post(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}/list`, {
          title: inputValue,
          position:position,
        });
        setListCreate(false);
        setInputValue("");
    }
    } catch (error) {
      console.error("Ошибка при добавлении списка:", error);
    }
  }
  async function putResponse(){
    await api.put(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`,{
        title: title,
        custom: {
          description: "desc1",
          color: "green"
        }
    })
  }
  function handleEnter(event:any, callback){
    if(event.key==="Enter"){
      inputRef.current.blur();
      callback();
    }
  }
useEffect(() => {
  async function getResponse() {
    try {
     const response:any = await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
      setBoards(response);
      setTitle(response.title);
    } catch (error) {
      console.error("Ошибка при получении данных о доске:", error);
    }
  }
  getResponse();
}, []);
  return (
    <div className="Board" onClick={putResponse}>
      <div className='container'>
        <header className='Board__header' onClick={putResponse}>
          <Link to="/board">
            <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          </Link>  
          <input 
            ref={inputRef}
            className="Board__header-title" type="text" 
            value={title} 
            onChange={renameBoard} 
            onKeyDown={(event)=>handleEnter(event,putResponse)} 
            />
          <div className='Board__header-block'></div>
        </header>
        <section className='Board__section'>
            {boards?.lists?(
              boards.lists.map((item:any)=>{
                return (
                    <List id={item.id} title={item.title} cards={item.cards}/>
                );  
              })
              ):(
              <p>Loading...</p>
              ) 
            }
          <div className='Board__list' draggable="true">
            {listCreate&&(
              <>
              <input className="Board__items-input" type="text" placeholder='Введiть назву дошки' onChange={handleInputChange} autoFocus/>
              <div className='Board__items'>
                <button className='Board__items-btn' onClick={postResponse} onKeyDown={(event)=>handleEnter(event,postResponse)}>Додати список</button> 
                <button className='Board__items-close' onClick={handleCloseButton}><img src={closeButton} alt="" width="70px"/></button> 
              </div>
              </>
            )}
            
            {buttonHidden&&<input className="Board__section-btn" type='submit' value="+ Додати список" onClick={handleCreateButton}/>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Board;
