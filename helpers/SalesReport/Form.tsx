import * as Yup from "yup";

export const getInitialValues = () => {
  return {
    report_by: "",
    day: "",
    week: "",
    month: "",
  };
};

export const validationSchema = Yup.object({
  report_by: Yup.string().required("Date report is required"),
});
