// import api from "@api/request";
// import useInput from "@customHooks/useInput";
import api from "../../../../api/request";
import useInput from "../../../Board/components/CustomHooks/useInput";
import Modal from "../../../Modal/Modal";
import { useState } from "react";
interface IProps {
  OneCardCreated: (newBoard: object) => void;
}
export default function CreateBoard({ OneCardCreated }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { inputValue, bind, setInputValue } = useInput("");
  const openModal = () => setIsModalOpen(true);
  const closeModalOk = () => {
    setIsModalOpen(false);
    setInputValue("");
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  const createBoard = (boardId: number) => {
    const boards = [
      {
        id: boardId,
        title: inputValue,
        custom: {
          description: "dfdf",
        },
      },
    ];
    OneCardCreated(boards);
  };
  const handleAddBoard = async () => {
    if (inputValue.trim() !== "") {
      const request: any = await api.post(`${apiUrl}/board`, {
        title: inputValue,
        custom: {
          description: "desc",
        },
      });
      try {
        closeModalOk();
        createBoard(request.id);
      } catch (error) {
        console.error("Произошла ошибка при выполнении POST-запроса:", error);
      }
    } else {
      closeModalOk();
    }
  };
  return (
    <>
      {isModalOpen && (
        <Modal>
          <Modal.Main>
            <input
              className="modal__item modal__input"
              placeholder="Введiть назву дошки"
              type="text"
              {...bind}
              autoFocus
            />
            <button
              className="modal__item modal__button"
              onClick={handleAddBoard}
            >
              Додати дошку
            </button>
            <input
              className="modal__close"
              type="button"
              value="Вийти"
              onClick={closeModalOk}
            />
          </Modal.Main>
        </Modal>
      )}
      <button className="modal__button home__item" onClick={openModal}>
        + Створити дошку
      </button>
    </>
  );
}
