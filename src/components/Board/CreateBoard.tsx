import React from 'react'
import { useState,useEffect } from 'react';
import api from '../../api/request';
import List from './List';
interface IProps{
    OneCardCreated:any;
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
export default function CreateBoard({OneCardCreated}:IProps) {
    const [boards, setBoards] = useState<BoardType>();
    const [color, setColor] = useState("0");
    const [title, setTitle] = useState("Моя тестова дошка");
    const id = window.location.pathname.split("/").pop();
    useEffect(() => {
        OneCardCreated(getResponse)
        async function getResponse() {
          try {
           const response:any = await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
            setBoards(response);
            // setTitle(response.title);
            // setColor(response.custom.description);
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
                return (
                    <List id={item.id} title={item.title} cards={item.cards}/>
                );  
              })
              ):(
              <p>Loading...</p>
              ) 
            }
    </>
  )
}
