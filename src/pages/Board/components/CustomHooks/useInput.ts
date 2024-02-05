import React, { ChangeEvent } from "react";
import { useState } from "react";
export default function useInput(initialData: any) {
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
