import React, { useState, useEffect,useRef, ChangeEvent } from 'react';
import '../../stylesBoard/board.css';
import List from './List';
import api from '../../api/request';
import { ErrorBoundary } from 'react-error-boundary';
import CreateBoard from './CreateBoard';
import {Link} from "react-router-dom"
import dragOnDrop from './dragOnDrop';
import RenameBoard from './RenameBoard';
import { AxiosResponse } from 'axios';
import CreaeteBoard from './CreateBoard';
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
  const [color, setColor] = useState("0");
  const [listCreate, setListCreate] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState<BoardType>();
  const [position, setPosition] = useState(1);
  const inputRef=useRef(null);
  const handleInputChange=(event:ChangeEvent<HTMLInputElement>)=>setInputValue(event.target.value);
  
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
        setButtonHidden(true);
    }
    } catch (error) {

    }
  }
  
  const OneCardCreated=(newBoard:BoardType)=>setBoards(newBoard);
  const OnePutRequest=(newRequest:string)=>setTitle(newRequest);
  function handleEnter(event:any,callback:()=>void) {
    if(event.key==="Enter"){
      callback();
    }
  }
  function progresBar(){
    api.interceptors.request.use((response)=> {
      // Do something before request is sent
      return response;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  }
  
  return (
    <div className="Board" style={{background:color}}>
      <div className='container'>
        <header className='Board__header'>
          <Link to="/board">
            <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          </Link>  
          <RenameBoard OnePutRequest={OnePutRequest}/>
          <div className='Board__header-block'></div>
        </header>
        <section className='Board__section'>
          <CreaeteBoard OneCardCreated={OneCardCreated} />
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
