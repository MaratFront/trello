interface ICard {
  title: string;
  custom: {
    description: string;
    color: string;
  };
  users: [{ id: number; username: "dff" }];
  lists: [
    {
      id: number;
      title: string;
      cards: [
        {
          id: number;
          title: string;
          color: string;
          description: string;
          custom: {
            deadline: string;
          };
          users: [number];
          created_at: number;
        }
      ];
    }
  ];
}
export default ICard;
