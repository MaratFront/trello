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
  const [color, setColor] = useState("#000000");
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
          color: "#000000",
        }
    })
  }
useEffect(() => {
  async function getResponse() {
    try {
     const response:any = await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
      setBoards(response);
      setTitle(response.title);
      setColor(response.custom.description);
      console.log(response.custom.color);
    } catch (error) {
      console.error("Ошибка при получении данных о доске:", error);
    }
  }
  getResponse();
}, []);
  function handleEnter(event:any,callback:any) {
    if(event.key==="Enter"){
      inputRef.current.blur();
      callback();
    }
  }
  return (
    <div className="Board" onClick={putResponse} style={{background:color}}>
      <div className='container'>
        <header className='Board__header'>
          <Link to="/board">
            <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          </Link>  
          <input 
            ref={inputRef}
            className="Board__header-title" 
            type="text" 
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
          <div className='List' draggable="true">
            {listCreate&&(
              <>
              <input 
                className="List__input" 
                type="text" 
                placeholder='Введiть назву дошки' 
                onChange={handleInputChange}
                onKeyDown={(event)=>{handleEnter(event,postResponse)}} 
                autoFocus/>
              <div className='List__items'>
                <button className='List__items-btn' onClick={postResponse}>Додати список</button> 
                <button className='List__items-close' onClick={handleCloseButton}><img src={closeButton} alt="" width="70px"/></button> 
              </div>
              </>
            )}
            
            {buttonHidden&&<input className="List__btn" type='submit' value="+ Додати список" onClick={handleCreateButton}/>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Board;
