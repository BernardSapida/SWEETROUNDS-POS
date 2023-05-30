import * as Yup from "yup";

import { Admin } from "@/types/Admin";

export const getInitialValues = (data: Admin) => {
  return {
    employee_firstname: data.employee_firstname,
    employee_lastname: data.employee_lastname,
    email: data.email,
    password: "",
    role: data.role,
    account_status: data.account_status,
  };
};

export const validationSchema = Yup.object({
  employee_firstname: Yup.string()
    .required("Employee firstname is required")
    .min(2, "Employee firstname must be at least 2 characters"),
  employee_lastname: Yup.string()
    .required("Employee lastname is required")
    .min(2, "Employee lastname must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email address is invalid"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at one least uppercase/lowercase letters, symbols, and numbers"
    ),
  role: Yup.string().required("Role is required"),
  account_status: Yup.string().required("Account status is required"),
});
