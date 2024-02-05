import React from "react";
interface IlistItems {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnter: any;
  handleCloseButton: () => void;
  postRequestList: () => Promise<void> | void;
  listInputColorBorder: boolean;
}
export default function ListItems({
  handleInputChange,
  handleEnter,
  handleCloseButton,
  postRequestList,
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
          handleEnter(event, postRequestList);
        }}
        autoFocus
      />
      <div className="List__items">
        <button className="List__items-btn" onClick={postRequestList}>
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
