import React from 'react'
import api from '../../api/request';
import { useEffect,useState } from 'react';
import List from './List';
import {Link} from "react-router-dom"
interface List{
  oneListCreated:any;
}
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
    title:string,
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
export default function CreateList({oneListCreated}:List) {
const [boards, setBoards] = useState<BoardType>(); 
const id=window.location.pathname.split('/').pop();
useEffect(() => {
  oneListCreated(getResponse)
  async function getResponse() {
    try {
      const response:any = await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
      setBoards(response)
      console.log(response);
    } catch (error) {
      console.error("Ошибка при получении данных о доске:", error);
    }
  }
}, []);
  return (
   <>
    {boards?.lists?(
      boards.lists.map((item:any)=>{
        return <Link key={item.id} to={`${item.id}`}>
          <List id={item.id} title={item.title} cards={item.cards}/>
        </Link>
        
      })
      ):(
      <p>Loading...</p>
      )
    }
   </>
  )
}
