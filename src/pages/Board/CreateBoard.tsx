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
  //состояние которое отвечает за показ элементов которые пояляются при нажатии на кнопку "додати список"
  const [showBoardItems, setShowBoardItems] = useState(false);
  // состояние отвечающее за создание списка которое используется в кастомном хуке CustomHooks/useAxios.ts
  /*состояние кнопки, при нажатии на которую появляються 
  элементы которые я описал выше,а сама кнопка пропадает.*/
  const [showButtonWhichCreateBoardItems, setShowButtonWhichCreateBoardItems] =
    useState(true);
  // Валидация инпута. если чел захочет нажать на кнопку "додати список" но в инпут ничего не введет то бордер станет красным
  const [listInputColorBorder, setListInputColorBorder] = useState(false);
  //состояние инпута в котором проходит валидация
  const [inputValue, setInputValue] = useState("");
  // позиция списка
  const [boardPosition, setBoardPosition] = useState(1);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setListInputColorBorder(false);
  };
  function handleCreateButton() {
    setShowBoardItems(true);
    setShowButtonWhichCreateBoardItems(false);
    setInputValue("");
  }
  const handleCloseButton = () => {
    setShowBoardItems(false);
    setShowButtonWhichCreateBoardItems(true);
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
  async function postRequestBoard() {
    setShowButtonWhichCreateBoardItems(true);
    setBoardPosition(boardPosition + 1);
    try {
      if (inputValue.trim() !== "") {
        await api.post(`${apiUrl}/board/${parseInt(id.board_id)}/list`, {
          title: inputValue,
          position: boardPosition,
        });
        setShowBoardItems(false);
      }
      return setListInputColorBorder(true);
    } catch (error) {
      console.log(error);
    }
  }
  function createBoard() {
    const newBoard: IBoard[] = [
      {
        id: parseInt(id.board_id),
        title: inputValue,
        cards: [],
      },
    ];
    setBoardPosition(boardPosition + 1);

    OneBoardCreated(newBoard);
    postRequestBoard();
  }

  return (
    <>
      <div className="list" draggable="true" style={{ border: "none" }}>
        {showButtonWhichCreateBoardItems && (
          <input
            className="list__btn"
            type="submit"
            value="+ Додати список"
            onClick={handleCreateButton}
          />
        )}
        {showBoardItems && (
          <ListItems
            handleInputChange={handleInputChange}
            handleEnter={handleEnter}
            handleCloseButton={handleCloseButton}
            createBoard={createBoard}
            listInputColorBorder={listInputColorBorder}
          />
        )}
      </div>
    </>
  );
}
