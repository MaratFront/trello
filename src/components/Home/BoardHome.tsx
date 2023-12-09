/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HomeComponent from './Home';
import '../../stylesHome/home.css';
import api from '../../api/request';
import { Link } from 'react-router-dom';
import CreateBoard from './CreateBoard';

function BoardHome() {
  const [homeItems, setHomeItems] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModalOk = () => {
    setIsModalOpen(false);
    setInputValue('');
  };

  const handleAddBoard = async () => {
    if (inputValue.trim() !== '') {
      await api.post("https://trello-back.shpp.me/maliiev/api/v1" + "/board", {
        title: inputValue,
        custom: {
          description: `#61dafb`
        }
      });
      try {
        closeModalOk();
      } catch (error) {
        console.error('Произошла ошибка при выполнении POST-запроса:', error);
      };

    }
  };
  useEffect(()=>{
    async function getResponse(){
      const data = await api("https://trello-back.shpp.me/maliiev/api/v1/board");
      setHomeItems(data);
    }  
    getResponse();
  },[]);


  return (
    <div className="Home">
      <div className="Home__container">
        <p className="Home__header">
          Мої дошки
        </p>
        <div className="Home__items">
          {isModalOpen && (
            <div className="Home__modal-overlay">
              <div className="Home__modal-window">
                <div className="Home__modal-header">
                  <CreateBoard OneCardCreated={setHomeItems(homeItems)}/>
                  <button className='Home__modal-button' onClick={handleAddBoard}>Додати дошку</button>
                </div>
                <input type="button" className="Home__modal-close" value="Вийти" onClick={closeModalOk} />
              </div>
            </div>
          )}
          {Object.values(homeItems).map((item:any) => {
              return item.map((itemResult: any) => (
                <Link key={itemResult.id} to={`${itemResult.id}`}>
                  <HomeComponent id={itemResult.id} title={itemResult.title} custom={{ background: itemResult.custom.description }} />
                </Link>
              ));
          })}
          <button className='Home__button Home__item' onClick={openModal}>+ Створити дошку</button>
        </div>
      </div>
    </div>
  );
}

export default BoardHome;
