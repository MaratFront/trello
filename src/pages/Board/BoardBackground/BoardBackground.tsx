import React from "react";
import IBackground from "src/common/interfaces/IBackground";
export default function BoardBackground({
  putRequest,
  color,
  changeBackground,
}: IBackground) {
  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      putRequest();
    }
  }
  return (
    <div className="board__color--items">
      <button className="board__background--btn btn" onClick={putRequest}>
        Змiнити колiр фону
      </button>
      <input
        type="color"
        className="board__header--background"
        value={color}
        onChange={changeBackground}
        onKeyDown={(event) => handleEnter(event)}
      />
    </div>
  );
}
