interface IBackground {
  putRequest: () => void;
  color: string;
  changeBackground: ChangeEvent<HTMLInputElement>;
}
export default IBackground;
