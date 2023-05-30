import axios from "axios";

export const fetchUserOrders = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/orders/user_orders`,
    {
      user_id: data.user_id,
      order_id: data.id,
    }
  );

  return response.data;
};

export const updateStatus = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/orders/update_status`,
    {
      id: data.id,
      order_status: data.order_status,
      payment_status: data.payment_status,
    }
  );

  return response.data;
};

export const fetchOrderList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/orders/list`
  );

  return response.data;
};

export const fetchOrderByKeyword = async (keyword: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/orders/search`,
    {
      keyword: keyword,
    }
  );

  return response.data;
};

export const fetchTopDonuts = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/top_selling`
  );

  return response.data;
};
