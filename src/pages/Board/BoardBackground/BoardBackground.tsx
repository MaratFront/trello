import React from "react";
import { Link } from "react-router-dom";
export default function BoardBackground({
  putRequest,
  color,
  changeBackground,
}) {
  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      putRequest();
    }
  }
  return (
    <div className="Board__color-items">
      <button className="Board__background-btn btn" onClick={putRequest}>
        Змiнити колiр фону
      </button>
      <input
        type="color"
        className="Board__header-background"
        value={color}
        onChange={changeBackground}
        onKeyDown={(event) => handleEnter(event)}
      />
    </div>
  );
}
