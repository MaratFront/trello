interface IList {
  id: number;
  title: string;
  cards: { id: number; title: string }[];
  OneCardCreated: (newCard: any) => any;
}
export default IList;
