import axios from "axios";
import { getMonth, getYear } from "../date";
import { numberFormat } from "../format";
import {
  fetchOnlineMonthlyRevenue,
  fetchOnlineRevenueByDay,
  fetchUserList,
  fetchWalkinMonthlyRevenue,
  fetchWalkinRevenueByDay,
} from "../Chart/Methods";
import { ColumnData } from "@/Types/Dashboard";

export const fetchRevenue = async () => {
  const responseOnline = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/month`,
    {
      year: getYear(),
      month: getMonth(),
    }
  );

  const responseWalkin = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/month`,
    {
      year: getYear(),
      month: getMonth(),
    }
  );

  const onlineRevenue = +responseOnline.data.revenue;
  const walkinsRevenue = +responseWalkin.data.revenue;

  return numberFormat(onlineRevenue + walkinsRevenue);
};

export const fetchCustomer = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/customers/new`
  );

  return numberFormat(response.data.data.length);
};

export const fetchProductSold = async () => {
  const responseOnline = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/sold/online/month`,
    {
      year: getYear(),
      month: getMonth(),
    }
  );

  const responseWalkin = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/sold/walkin/month`,
    {
      year: getYear(),
      month: getMonth(),
    }
  );

  return numberFormat(
    +responseOnline.data.total_sold + +responseWalkin.data.total_sold
  );
};

export const fetchTransaction = async () => {
  const responseOnline = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/number_of_transaction/month`,
    {
      year: getYear(),
      month: getMonth(),
    }
  );

  const responseWalkin = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/number_of_transaction/month`,
    {
      year: getYear(),
      month: getMonth(),
    }
  );

  const onlineTransaction = responseOnline.data.completed_transaction;
  const walkinTransaction = responseWalkin.data.completed_transaction;

  return numberFormat(onlineTransaction + walkinTransaction);
};

export const fetchMonthlyRevenue = async (): Promise<
  {
    name: string;
    data: number[];
  }[]
> => {
  const onlineResponse = await fetchOnlineMonthlyRevenue();
  const walkinResponse = await fetchWalkinMonthlyRevenue();
  const arr = Array.from({ length: 12 }, () => 0);

  onlineResponse.data.map(
    (obj: Record<string, any>, index: number) => (arr[index] += +obj.revenue)
  );

  walkinResponse.data.map(
    (obj: Record<string, any>, index: number) => (arr[index] += +obj.revenue)
  );

  return [
    {
      name: "Monthly Earnings",
      data: arr,
    },
  ];
};

export const fetchEarnings = async () => {
  const responseOnline = await fetchOnlineRevenueByDay();
  const responseWalkin = await fetchWalkinRevenueByDay();
  const onlineRevenue = +responseOnline.revenue;
  const walkinsRevenue = +responseWalkin.revenue;

  return numberFormat(onlineRevenue + walkinsRevenue);
};

export const fetchUsers = async () => {
  const response = await fetchUserList();
  return numberFormat(response.data.length);
};
