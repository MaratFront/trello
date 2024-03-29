interface IList {
  boards: any[];
  listId?: number;
  title: string;
  cards: { id: number; title: string }[];
  OneCardCreated?: (newCard) => void;
}
export default IList;
