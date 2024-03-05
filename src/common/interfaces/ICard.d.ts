interface ICard {
  list_id: number;
  position: number;
  title: string;
  color: string;
  description: string;
  custom: {
    deadline: string;
  };
}
export default ICard;
