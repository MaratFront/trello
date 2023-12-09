// Card.tsx
import React from 'react';

interface CardProps {
  title: string;
}

function Card({ title}: CardProps){
  return (
    <div className="Board__card" draggable="true">
      <p className='Board__card-title'>{title}</p>
    </div>
  );
};

export default Card;
