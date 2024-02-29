import React from "react";
interface IButton {
  eventFunction?: () => void;
  text: string | number;
  className: string;
}
export default function Button({ eventFunction, text, className }: IButton) {
  return (
    <button className={className} type="submit" onClick={eventFunction}>
      {text}
    </button>
  );
}
