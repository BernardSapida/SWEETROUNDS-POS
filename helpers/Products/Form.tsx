import * as Yup from "yup";
import { Product } from "@/types/Product";

export const getInitialValues = (data: Product) => {
  return {
    name: data.name,
    flavor: data.flavor,
    price: data.price,
    quantity: data.quantity,
    quantity_sold: data.quantity_sold,
    availability: data.availability,
  };
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  flavor: Yup.string().required("Flavor is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Minimum price should be 0"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(0, "Minimum quantity should be 0"),
  availability: Yup.string().required("Availability is required"),
});
