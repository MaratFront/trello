/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import HomeComponent from './Home';
import '../../stylesHome/home.css';
import api from '../../api/request';
import { Link } from 'react-router-dom';



function BoardHome() {
  const [homeItems, setHomeItems] = useState({ boards: [] });
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue('');
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAddBoard = async () => {
    if (inputValue.trim() !== '') {
      await api.post("https://trello-back.shpp.me/maliev/api/v1" + "/board", {
        title: inputValue,
        custom: {
          description: `#fff`
        }
      });
      try {
        closeModal();
      } catch (error) {
        console.error('Произошла ошибка при выполнении POST-запроса:', error);
      };

    }
  };
  useEffect(() => {
    async function getResponse(){
      const {data} = await api("https://trello-back.shpp.me/maliev/api/v1/board");
      setHomeItems(data);
      console.log(data);
    }
    getResponse();
  },[])

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
                <input type="button" className="Home__modal-close" value="Вийти" onClick={closeModal} />
              </div>
            </div>
          )}
          {/* {homeItems&&Object.values(homeItems).map((item: object) => {
            return Object.values(item).map((elem: object) => {
              return Object.values(elem).map((itemResult: any) => (
                <Link to="/board/id" key={itemResult.id}>
                  <HomeComponent title={itemResult.title} custom={{ background: itemResult.custom.description }} />
                </Link>
              ));
            });
          })} */}
          <button className='Home__button Home__item' onClick={openModal}>+ Створити дошку</button>
        </div>
      </div>
    </div>
  );
}

export default BoardHome;
