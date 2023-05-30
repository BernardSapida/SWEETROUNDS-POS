import { Dispatch, MutableRefObject, SetStateAction } from "react";
import axios from "axios";

import { generateUUID } from "@/helpers/uuid";
import { Setting } from "@/types/Setting";

export const fetchSetting = async (
  setSetting: Dispatch<SetStateAction<Setting>>
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/settings/read`
  );

  setSetting(response.data.data);
};

export const processOrder = (
  items: Record<string, any>,
  subTotal: MutableRefObject<number>,
  donutQuantity: MutableRefObject<number>,
  invoiceId: MutableRefObject<string>
) => {
  subTotal.current = 0;
  donutQuantity.current = 0;
  invoiceId.current = generateUUID();

  Object.values(items).filter((item: Record<string, any>) => {
    subTotal.current += item.quantity * item.price;
    donutQuantity.current += item.quantity;
  });
};

const validQuantity = (id: number, order: Record<string, any>): boolean => {
  const quantity: number = order[id].quantity + 1;
  const remaining_quantity: number = order[id].remaining_quantity;
  return quantity <= remaining_quantity;
};

export const updateOrder = (
  item: Record<string, any>,
  order: Record<string, any>,
  setOrder: Dispatch<SetStateAction<Record<string, any>>>
) => {
  const updatedOrder: Record<string, any> = {};

  if (order[item.id]) {
    if (validQuantity(item.id, order)) order[item.id].quantity += 1;
    Object.assign(updatedOrder, order);
    setOrder(updatedOrder);
  } else {
    order[item.id] = {
      id: item.id,
      name: item.name,
      quantity: 1,
      image: item.image,
      price: item.price,
      remaining_quantity: item.quantity,
    };
    Object.assign(updatedOrder, order);

    setOrder(updatedOrder);
  }
};

export const createItem = async (
  id: number,
  quantity: number,
  transaction_id: number
) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/transaction_items/create`,
    {
      product_id: id,
      quantity: quantity,
      transaction_id: transaction_id,
    }
  );
};

export const reduceProduct = async (id: number, quantity: number) => {
  await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/v1/products/reduce`, {
    id: id,
    quantity: quantity,
  });
};

export const reduceOrder = (
  id: string | number,
  order: Record<string, any>,
  setOrder: Dispatch<SetStateAction<Record<string, any>>>
) => {
  if (order[id] && order[id].quantity > 1) {
    const updatedOrder = {};
    order[id].quantity -= 1;
    Object.assign(updatedOrder, order);
    setOrder(updatedOrder);
  }
};

export const createTransaction = async (
  setting: Record<string, any>,
  invoiceId: MutableRefObject<string>,
  donutQuantity: number,
  subTotal: number,
  order: Record<string, any>,
  note: string,
  cashierId: number
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/transactions/create`,
    {
      invoice_id: invoiceId,
      items: JSON.stringify(order),
      donut_quantity: donutQuantity,
      note: note,
      tax: setting.tax,
      discount: setting.discount,
      total: setting?.tax + subTotal - setting?.discount,
      admin_id: cashierId,
    }
  );

  return response.data;
};

export const fetchProductsList = async () => {
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
