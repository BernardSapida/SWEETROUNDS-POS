import axios from "axios";

// BY DATE
export const fetchWalkinRevenueByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/day`,
    {
      date: date,
    }
  );

  return Number(response.data.revenue);
};

export const fetchOnlineRevenueByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/day`,
    {
      date: date,
    }
  );

  return Number(response.data.revenue);
};

export const fetchWalkinTransactionByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/number_of_transaction/day`,
    {
      date: date,
    }
  );

  return response.data.completed_transaction;
};

export const fetchOnlineTransactionByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/number_of_transaction/day`,
    {
      date: date,
    }
  );

  return response.data.completed_transaction;
};

export const fetchWalkinAverageSaleByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/average/day`,
    {
      date: date,
    }
  );

  return Number(response.data.average_sale);
};

export const fetchOnlineAverageSaleByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/average/day`,
    {
      date: date,
    }
  );

  return Number(response.data.average_sale);
};

export const fetchCashierTransactionByDay = async (date: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/cashier/transaction/day`,
    {
      date: date,
    }
  );

  return response.data.data || [{}];
};

// BY WEEK
export const fetchWalkinRevenueByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/week`,
    {
      year: year,
      week: week,
    }
  );

  return Number(response.data.revenue);
};

export const fetchOnlineRevenueByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/week`,
    {
      year: year,
      week: week,
    }
  );

  return Number(response.data.revenue);
};

export const fetchWalkinTransactionByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/number_of_transaction/week`,
    {
      year: year,
      week: week,
    }
  );

  return response.data.completed_transaction;
};

export const fetchOnlineTransactionByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/number_of_transaction/week`,
    {
      year: year,
      week: week,
    }
  );
  return response.data.completed_transaction;
};

export const fetchWalkinAverageSaleByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/average/week`,
    {
      year: year,
      week: week,
    }
  );

  return Number(response.data.average_sale);
};

export const fetchOnlineAverageSaleByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/average/week`,
    {
      year: year,
      week: week,
    }
  );

  return Number(response.data.average_sale);
};

export const fetchCashierTransactionByWeek = async (year: any, week: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/cashier/transaction/week`,
    {
      year: year,
      week: week,
    }
  );

  return response.data.data || [{}];
};

// BY MONTH
export const fetchWalkinRevenueByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/month`,
    {
      year: year,
      month: month,
    }
  );

  return Number(response.data.revenue);
};

export const fetchOnlineRevenueByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/month`,
    {
      year: year,
      month: month,
    }
  );

  return Number(response.data.revenue);
};

export const fetchWalkinTransactionByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/number_of_transaction/month`,
    {
      year: year,
      month: month,
    }
  );

  return response.data.completed_transaction;
};

export const fetchOnlineTransactionByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/number_of_transaction/month`,
    {
      year: year,
      month: month,
    }
  );
  return response.data.completed_transaction;
};

export const fetchWalkinAverageSaleByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/average/month`,
    {
      year: year,
      month: month,
    }
  );

  return Number(response.data.average_sale);
};

export const fetchOnlineAverageSaleByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/average/month`,
    {
      year: year,
      month: month,
    }
  );

  return Number(response.data.average_sale);
};

export const fetchCashierTransactionByMonth = async (year: any, month: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/cashier/transaction/month`,
    {
      year: year,
      month: month,
    }
  );

  return response.data.data || [{}];
};

// Overall
export const fetchNewCustomers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/customers/new`
  );

  return response.data.data || [{}];
};

export const fetchLowQuantityDonut = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/low_quantity`
  );

  return response.data.data || [{}];
};

export const fetchTop10Donuts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/top_selling`
  );

  return response.data.data || [{}];
};

export const fetchDonutSale = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/total_sale`
  );

  return response.data.data || [{}];
};
