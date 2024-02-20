import React from "react";
interface IlistItems {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnter: any;
  handleCloseButton: () => void;
  createBoard: () => Promise<void> | void;
  listInputColorBorder: boolean;
}
export default function ListItems({
  handleInputChange,
  handleEnter,
  handleCloseButton,
  createBoard,
  listInputColorBorder,
}: IlistItems) {
  return (
    <>
      <input
        style={{
          border: listInputColorBorder ? "2px solid red" : "1px solid #ccc",
        }}
        className="List__input"
        type="text"
        placeholder="Введiть назву дошки"
        onChange={handleInputChange}
        onKeyDown={(event) => {
          handleEnter(event, createBoard);
        }}
        autoFocus
      />
      <div className="List__items">
        <button className="List__items-btn" onClick={createBoard}>
          Додати список
        </button>
        <button className="List__items-close" onClick={handleCloseButton}>
          <img
            src={process.env.PUBLIC_URL + "/close.png"}
            alt=""
            className="List__item-close"
            width="35px"
          />
        </button>
      </div>
    </>
  );
}
