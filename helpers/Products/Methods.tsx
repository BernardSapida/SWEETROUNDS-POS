import axios from "axios";

export const updateProduct = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/products/update`,
    {
      id: data.id,
      name: data.name,
      flavor: data.flavor,
      price: data.price,
      quantity: data.quantity,
      availability: data.availability,
    }
  );

  return response.data;
};

export const fetchProductList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/products/list`
  );

  return response.data;
};

export const fetchProductByKeyword = async (keyword: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/products/search`,
    {
      keyword: keyword,
    }
  );

  return response.data;
};

export const name = async () => {};
