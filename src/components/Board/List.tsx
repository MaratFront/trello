import React from 'react';
import api from '../../api/request';
import '../../stylesBoard/board.css';
import Card from './Card';
interface IProps {
  title: string;
  cards:{title:string}[];
}
function List({ title, cards }: IProps) {
  const [inputValue, setInputValue] = React.useState(title);

  function handleInputChange(event:any){
    setInputValue(event.target.value);
  }
  function handleButtonClick(event:React.KeyboardEvent){
    if(event.key==="Enter"){
      putRequest();
    }
  }
  async function putRequest(){

    await api.put(
      `https://trello-back.shpp.me/maliiev/api/v1/board/${1}`,
      {
        title:inputValue,
        custom: {
          description: "desc1",
          color: "green"
        }
      });
  }
  return (
     <>
     <div className="Board__list">
      <input 
        className='Board__list-title' 
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleButtonClick}
      />
      
      <div className="Board__list-card">
        {cards.map((card)=>(
          <Card title={card.title}/>
          
        ))}
        <button className="Board__list-button" type="submit">+ Додати картку</button>
      </div>
     
    </div>
    
  </>  
  );
}

export default List;
