import React from "react";
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
        <button className="Board__header-btn btn" type="submit">
          &#8592; домой
        </button>
      </Link>
      <input
        ref={inputRef}
        className="Board__header-title"
        type="text"
        {...bind}
        onKeyDown={(event) => handleEnter(event)}
        onBlur={putRequest}
      />
    </>
  );
}
