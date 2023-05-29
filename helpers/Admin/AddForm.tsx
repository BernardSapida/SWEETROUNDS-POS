import * as Yup from "yup";

export const getInitialValues = () => {
  return {
    employee_firstname: "",
    employee_lastname: "",
    email: "",
    password: "",
    role: "",
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
});
