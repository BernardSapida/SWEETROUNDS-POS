import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { ErrorMessage } from "formik";
import { ChangeEvent } from "react";

export default function Field({
  type,
  name,
  label,
  value,
  handleChange,
  loading,
}: {
  type: string;
  name: string;
  label: string;
  value: string | undefined;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  loading: boolean;
}) {
  return (
    <FloatingLabel className="mb-3" label={label}>
      <Form.Control
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={label}
        disabled={loading}
      />
      <ErrorMessage name={name} component="p" className="text-danger" />
    </FloatingLabel>
  );
}
