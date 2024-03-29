import { ChangeEvent, useState } from "react";
export default function useInput(initialData: string) {
  const [inputValue, setInputValue] = useState(initialData);
  const bind = {
    value: inputValue,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setInputValue(e.target.value),
  };
  return {
    inputValue,
    setInputValue,
    bind,
  };
}
