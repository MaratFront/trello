import React from "react";
import Button from "src/pages/UI/Button";
import { Link } from "react-router-dom";
export default function BoardTitle({ inputRef, bind, putRequest }) {
  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }
  return (
    <>
      <Link to="/">
        <Button text="&#8592; домой" className="board__header--home" />
      </Link>
      <input
        ref={inputRef}
        className="board__header--title"
        type="text"
        {...bind}
        onKeyDown={(event) => handleEnter(event)}
        onBlur={putRequest}
      />
    </>
  );
}
