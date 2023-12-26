import React, { useState, useEffect } from 'react';
import '../../stylesBoard/board.css';
import List from './List';
import api from '../../api/request';
import dragOnDrop from './dragOnDrop';
function Board() {
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
  const [title, setTitle] = useState("Моя тестова дошка");
  const [listCreate, setListCreate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState<BoardType>();
  const [createListCounter, setCreateListCounter] = useState(0);
  function handleCreateList() {
    if (createListCounter === 1) {
      postResponse();
    } else {
      setListCreate(true);
      setCreateListCounter(createListCounter + 1);
    }
  }
  function handleInputChange(event:any) {
    setInputValue(event.target.value);
  }
  const id = window.location.pathname.split("/").pop();
  function positionChanged(counter:number){
    return ()=>{
      return counter++;
    }
  }
  let newPosition=positionChanged(1);
  async function postResponse() {
    try {
      if(inputValue.trim()!==""){
        await api.post(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}/list`, {
          title: inputValue,
          position:newPosition(),
        });
        setListCreate(false);
        setInputValue("");
        setCreateListCounter(0);
    }
    } catch (error) {
      console.error("Ошибка при добавлении списка:", error);
    }
  }
useEffect(() => {
  async function getResponse() {
    try {
      const response:any = await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
      setBoards(response)
      console.log(response);
    } catch (error) {
      console.error("Ошибка при получении данных о доске:", error);
    }
  }
  getResponse();
}, []);
  return (
    <div className="Board">
      <div className='container'>
        <header className='Board__header'>
          <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          <p className='Board__header-title'>{title}</p>
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
            <input className="Board__section-btn" type='submit' value="+ Додати список" onClick={handleCreateList} />
            {listCreate && <input type="text" value={inputValue} onChange={handleInputChange} />}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Board;
