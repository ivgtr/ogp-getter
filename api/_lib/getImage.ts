import axios from "axios";

export const getImage = async (url: string) => {
  const resp = await axios.get(url);
  const body = resp.data;


  return { body };
};