import React from 'react'
import {useRef,useState,useEffect} from "react";
import api from '../../api/request';
interface IProps{
    OnePutRequest:any;
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
export default function RenameBoard({OnePutRequest}:IProps) {
    const [title, setTitle] = useState("Моя тестова дошка");
    const inputRef=useRef(null);
    const id = window.location.pathname.split("/").pop();
    const renameBoard=(event:React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    
    function handleEnter(event:React.KeyboardEvent<HTMLInputElement>,callback:()=>void) {
        if(event.key==="Enter"){
          inputRef.current.blur();
          callback();
        }
    }
    async function putResponse(){
        await api.put(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`,{
            title: title,
            custom: {
              description: "desc1",
              color: "#000000",
            }
        })
    }
    useEffect(() => {
    OnePutRequest(getResponse);
    console.log(OnePutRequest)
      async function getResponse() {
        try {
         const response:BoardType = await api.get(`https://trello-back.shpp.me/maliiev/api/v1/board/${id}`);
          setTitle(response.title);
        } catch (error) {
          console.error("Ошибка при получении данных о доске:", error);
        }
      }
    }, []);    
    return (
        <input 
        ref={inputRef}
        className="Board__header-title" 
        type="text" 
        value={title} 
        onChange={renameBoard} 
        onKeyDown={(event)=>handleEnter(event,putResponse)}
    />
    )
}
