import React from 'react'
import api from '../../api/request';
import { useState } from 'react';
interface IProps{
    OneCardCreated:any;
}

export default function CreateBoard({OneCardCreated}:IProps) {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalOk = () => {
    setIsModalOpen(false);
    setInputValue('');
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target);
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
  return (
    <>
      <input
      className='Home__modal-input'
      placeholder="Введiть назву дошки"
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      autoFocus
      />
    <button className='Home__modal-button' onClick={handleAddBoard}>Додати дошку</button>
    </>
             

  )
}
