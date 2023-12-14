import React, { useState, useEffect } from 'react';
import '../../stylesBoard/board.css';
import List from './List';
import api from '../../api/request';
import CreateList from './CreateList';
import dragOnDrop from './dragOnDrop';

function Board() {
  const [title, setTitle] = useState("Моя тестова дошка");
  const [lists, setLists] = useState({});
  const [listCreate, setListCreate] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  async function postResponse() {
    try {
      await api.post(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}/list`, {
        title: inputValue,
        position: 2,
      });
      setListCreate(false);
      setInputValue("");
      setCreateListCounter(0);
    } catch (error) {
      console.error("Ошибка при добавлении списка:", error);
    }
  }
  useEffect(()=>{
    async function getResponse() {
      try {
        const data=await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
        setLists(data);   
        console.log(data)
    
      }catch(error){
        console.log(error);
      }
    }
  getResponse();
},[])

  return (
    <div className="Board">
      <div className='container'>
        <header className='Board__header'>
          <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          <p className='Board__header-title'>{title}</p>
          <div className='Board__header-block'></div>
        </header>
        <section className='Board__section'>
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
