import * as Yup from "yup";

export const validationSchema = Yup.object({
  tax: Yup.number().required("Tax is required").min(0, "Minimum tax is 0"),
  discount: Yup.number()
    .required("Discount is required")
    .min(0, "Minimum discount is 0"),
  shipping_fee: Yup.number()
    .required("Shipping fee is required")
    .min(0, "Minimum Shipping fee is 0"),
  accepting_order: Yup.number().required("Accepting order is required"),
});
