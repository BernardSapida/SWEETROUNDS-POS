import axios from "axios";

export const updateSetting = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/settings/update`,
    {
      tax: data.tax,
      discount: data.discount,
      shipping_fee: data.shipping_fee,
      accepting_order: data.accepting_order,
    }
  );

  return response.data;
};

export const readSetting = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/settings/read`
  );

  return response.data;
};
