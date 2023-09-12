import axios from "axios";
import { getDate, getYear } from "@/helpers/date";

export const fetchOnlineTransaction = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/number_of_transaction/all`
  );

  return response.data;
};

export const fetchWalkinTransaction = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/number_of_transaction/all`
  );

  return response.data;
};

export const fetchOnlineMonthlyRevenue = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/monthly`,
    {
      year: getYear(),
    }
  );

  console.log("LOG: ")
  console.log(process.env.NEXT_PUBLIC_URL)

  return response.data;
};

export const fetchWalkinMonthlyRevenue = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/monthly`,
    {
      year: getYear(),
    }
  );

  return response.data;
};

export const fetchOnlineRevenueByDay = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/day`,
    {
      date: getDate(),
    }
  );

  return response.data;
};

export const fetchWalkinRevenueByDay = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/day`,
    {
      date: getDate(),
    }
  );

  return response.data;
};

export const fetchUserList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/users/list`
  );

  return response.data;
};
