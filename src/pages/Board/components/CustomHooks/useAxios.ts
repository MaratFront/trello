import React from "react";
import { useState, useEffect } from "react";
import api from "../../../../api/request";
import ICard from "../../../../common/interfaces/ICard";
import { useParams } from "react-router-dom";
export default function useAxios(
  createItemList: any,
  url: string,
  initialData: object | any = null,
  dependencies: boolean = false
) {
  const [boards, setBoards] = useState({});
  useEffect(() => {
    createItemList(getResponse);
    async function getResponse() {
      const response = await api.get(url);
      setBoards(response);
      console.log(response);
    }
  }, [dependencies]);
  return [boards, dependencies, createItemList, initialData];
}
