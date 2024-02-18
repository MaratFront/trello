import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/request";
import ListItems from "./components/List/ListItems";
import List from "./components/List/List";
import IBoard from "../../common/interfaces/IBoard";
interface ICard {
  OneBoardCreated?: (newBoard: IBoard[]) => void;
}
export default function CreateBoard({ OneBoardCreated }: ICard) {
  const [boards, setBoards] = useState([]);
  //состояние которое отвечает за показ элементов которые пояляются при нажатии на кнопку "додати список"
  const [showListItems, setShowListItems] = useState(false);
  // состояние отвечающее за создание списка которое используется в кастомном хуке CustomHooks/useAxios.ts
  /*состояние кнопки, при нажатии на которую появляються 
  элементы которые я описал выше,а сама кнопка пропадает.*/
  const [showButtonWhichCreateListItems, setShowButtonWhichCreateListItems] =
    useState(true);
  // Валидация инпута. если чел захочет нажать на кнопку "додати список" но в инпут ничего не введет то бордер станет красным
  const [listInputColorBorder, setListInputColorBorder] = useState(false);
  //состояние инпута в котором проходит валидация
  const [inputValue, setInputValue] = useState("");
  // позиция списка
  const [listPosition, setListPosition] = useState(1);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setListInputColorBorder(false);
  };
  function handleCreateButton() {
    setShowListItems(true);
    setShowButtonWhichCreateListItems(false);
    setInputValue("");
  }
  const handleCloseButton = () => {
    setShowListItems(false);
    setShowButtonWhichCreateListItems(true);
    setInputValue("");
  };
  function handleEnter(
    event: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) {
    if (event.key === "Enter") callback();
  }
  const apiUrl = process.env.REACT_APP_API_URL;
  const id = useParams();
  async function postRequestList() {
    setShowButtonWhichCreateListItems(true);
    setListPosition(listPosition + 1);
    try {
      if (inputValue.trim() !== "") {
        await api.post(`${apiUrl}/board/${parseInt(id.board_id)}/list`, {
          title: inputValue,
          position: listPosition,
        });
        setShowListItems(false);
      }
      return setListInputColorBorder(true);
    } catch (error) {
      console.log(error);
    }
    OneBoardCreated(boards);
  }
  function createList() {
    const newBoard: IBoard[] = [
      {
        id: id.board_id,
        title: inputValue,
        cards: [],
      },
    ];
    setListPosition(listPosition + 1);
    setBoards((board) => [...board, ...newBoard]);
    postRequestList();
  }

  return (
    <>
      {boards
        .sort((a: number, b: number) => a - b)
        .map((item: IBoard) => {
          return (
            <List
              key={item.id}
              id={item.id}
              title={item.title}
              cards={item.cards}
            />
          );
        })}
      <div className="List" draggable="true">
        {showButtonWhichCreateListItems && (
          <input
            className="List__btn"
            type="submit"
            value="+ Додати список"
            onClick={handleCreateButton}
          />
        )}
        {showListItems && (
          <ListItems
            handleInputChange={handleInputChange}
            handleEnter={handleEnter}
            handleCloseButton={handleCloseButton}
            postRequestList={createList}
            listInputColorBorder={listInputColorBorder}
          />
        )}
      </div>
    </>
  );
}
