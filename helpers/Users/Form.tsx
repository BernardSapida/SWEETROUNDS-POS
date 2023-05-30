import * as Yup from "yup";

export const validationSchema = Yup.object({
  id: Yup.number().required("ID is required"),
  account_status: Yup.string().required("Account status is required"),
});
