import React, { useState, useEffect } from 'react';
import '../../stylesBoard/board.css';
import List from './List';
import api from '../../api/request';
import CreateList from './CreateList';


function Board() {
  const [title, setTitle] = useState("Моя тестова дошка");
  interface List{
    id: number
    position: number 
    title: string
  }
  const [lists, setLists] = useState<List>();
  const [listCreate, setListCreate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState(1)
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
        position:2
      });
      setListCreate(false);
      setInputValue("");
      setCreateListCounter(0);
    } catch (error) {
      console.error("Ошибка при добавлении списка:", error);
    }
  }
  useEffect(() => {
    async function getResponse() {
      const data=await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
      setLists(data);
      //console.log(data);
     }
     getResponse();
  },[])
  console.log(lists)

  return (
    <div className="Board">
      <div className='container'>
        <header className='Board__header'>
          <button className="Board__header-btn btn" type="submit">&#8592; домой</button>
          <p className='Board__header-title'>{title}</p>
          <div className='Board__header-block'></div>
        </header>
        <section className='Board__section'>
        {lists.lists.map((item:any)=>{
          <List title={item.title} cards={item.cards} />
        })}/
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
