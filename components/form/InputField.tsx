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
  readOnly,
}: {
  type: string;
  name: string;
  label?: string;
  value?: string | number | undefined;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  loading?: boolean;
  readOnly?: boolean;
}) {
  return (
    <FloatingLabel className="mt-3" label={label}>
      <Form.Control
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={label}
        disabled={loading}
        readOnly={readOnly}
      />
      <ErrorMessage name={name} component="p" className="text-danger" />
    </FloatingLabel>
  );
}
