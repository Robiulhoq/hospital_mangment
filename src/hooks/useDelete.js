import axios from "axios";
import { useState } from "react";
import { getCookie } from "../Utils/getCookie";
const useDelete = (api, setTigger) => {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteloading, setDeleteloading] = useState(false);
  const token = getCookie("access_token");
  const hendleDelete = async (id) => {
    setDeleteloading(true);
    try {
      const response = await axios.delete(api + id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteloading(false);
      setDeleteMessage(response.data);
      setTigger(true);
    } catch (error) {
      setDeleteMessage("error");
      throw error;
    }
  };
  if (deleteMessage) {
    setInterval(() => {
      setDeleteMessage("");
    }, 3000);
  }
  return { deleteloading, deleteMessage, hendleDelete };
};
export default useDelete;
