import React from 'react'
import api from '../../api/request';
import {Link} from "react-router-dom"
import HomeComponent from './Home';
import { useState, useEffect } from 'react';
interface IProps{
    OneCardCreated:any;
}

export default function CreateBoard({OneCardCreated}:IProps) {
  const [homeItems, setHomeItems] = useState({});
  useEffect(()=>{
    OneCardCreated(getResponse);
    async function getResponse(){
      const data = await api("https://trello-back.shpp.me/maliiev/api/v1/board");
      return setHomeItems(data);
    }  
  },[]);
  return (
    <>
      {Object.values(homeItems).map((item:any) => {
        return item.map((itemResult:any) => (
          <Link key={itemResult.id} to={`${itemResult.id}`}>
            <HomeComponent id={itemResult.id} title={itemResult.title} custom={{ background: itemResult.custom.description }} />
          </Link>
          ));
        })}
    </>
             

  )
}
