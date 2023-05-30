import * as Yup from "yup";
import { Order } from "@/types/Order";

export const getInitialValues = (data: Order) => {
  return {
    order_status: data.order_status,
    payment_status: data.payment_status,
  };
};

export const validationSchema = Yup.object({
  order_status: Yup.string().required("Order status is required"),
  payment_status: Yup.string().required("Payment status is required"),
});
