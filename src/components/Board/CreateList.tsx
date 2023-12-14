import React from 'react'
interface List{
    oneListCreated:()=>void;
}
/*
{lists.map((list) => (
    <List key={list.id} title={list.title} cards={list.cards} />
  ))}
*/
export default function CreateList({oneListCreated}:List) {
  return (
    <div>
      
    </div>
  )
}

