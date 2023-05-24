import axios from "axios";

export const fetchTransactionItems = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/transactions/items`,
    {
      transaction_id: data.id,
    }
  );

  return response.data;
};

export const fetchTransactionList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/transactions/list`
  );

  return response.data;
};

export const fetchTransactionListByKeyword = async (keyword: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/transactions/search`,
    {
      keyword: keyword,
    }
  );

  return response.data;
};
