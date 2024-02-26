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
        className="list__input"
        type="text"
        placeholder="Введiть назву списку"
        onChange={handleInputChange}
        onKeyDown={(event) => {
          handleEnter(event, createBoard);
        }}
        autoFocus
      />
      <div className="list__add">
        <button className="list__add-card" onClick={createBoard}>
          Додати список
        </button>
        <button className="list__none-card" onClick={handleCloseButton}>
          <img
            src={process.env.PUBLIC_URL + "/close.png"}
            alt=""
            width="35px"
          />
        </button>
      </div>
    </>
  );
}
