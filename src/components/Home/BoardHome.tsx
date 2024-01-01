/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HomeComponent from './Home';
import '../../stylesHome/home.css';
import api from '../../api/request';
import { Link } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import Board from '../Board/Board';
function BoardHome() {
  const [homeItems, setHomeItems] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModalOk = () => {
    setIsModalOpen(false);
    setInputValue('');
  };
  const OneCardCreated=(newBoard:object) => {setHomeItems(newBoard); console.log(newBoard);}
  const handleInputChange = (event: any) => setInputValue(event.target.value);
  const handleAddBoard = async () => {
    if (inputValue.trim() !== '') {
      await api.post("https://trello-back.shpp.me/maliiev/api/v1/board", {
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
  return (
    <div className="Home">
      <p className="Home__header">
        Мої дошки
      </p>
      <div className="Home__container">
        <div className="Home__items">
          {isModalOpen && (
            <div className="Home__modal-overlay">
              <div className="Home__modal-window">
                <div className="Home__modal-header">
                <input
                  className='Home__modal-input'
                  placeholder="Введiть назву дошки"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  autoFocus
              />
                  <button className='Home__modal-button' onClick={handleAddBoard}>Додати дошку</button>
                </div>
                <input type="button" className="Home__modal-close" value="Вийти" onClick={closeModalOk} />
              </div>
            </div>
          )}
          <CreateBoard OneCardCreated={OneCardCreated}/>
          <button className='Home__button Home__item' onClick={openModal}>+ Створити дошку</button>
        </div>
      </div>
    </div>
  );
}

export default BoardHome;
