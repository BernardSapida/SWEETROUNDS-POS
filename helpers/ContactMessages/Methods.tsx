import axios from "axios";

export const fetchContactMessages = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/contact_messages/list`
  );

  return response.data;
};

export const fetchContactMessagesByKeyword = async (keyword: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/contact_messages/search`,
    { keyword: keyword }
  );

  return response.data;
};
