import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

import { validationSchema } from "@/helpers/Settings/Form";
import { updateSetting } from "@/helpers/Settings/Methods";
import { Setting } from "@/types/Setting";

import Field from "@/components/form/InputField";

export default function SettingForm({
  userRole,
  setting,
}: {
  userRole: string;
  setting: Setting;
}) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = { ...setting };

  const displayAlertMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Shop settings updated successfully",
    });
  };

  const handleSubmit = async (values: Setting) => {
    setLoading(true);

    const response = await updateSetting(values);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Setting successfully updated",
      });
    }

    setEdit(false);
    setLoading(false);
    displayAlertMessage();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, resetForm }) => (
        <Form onSubmit={handleSubmit} id="settingForm">
          <Field
            type="number"
            name="tax"
            label="Tax Rate"
            handleChange={handleChange}
            value={values.tax}
            loading={!edit || loading}
          />
          <Field
            type="number"
            name="discount"
            label="Discount"
            handleChange={handleChange}
            value={values.discount}
            loading={!edit || loading}
          />
          <Field
            type="number"
            name="shipping_fee"
            label="Shipping Fee"
            handleChange={handleChange}
            value={values.shipping_fee}
            loading={!edit || loading}
          />
          <FloatingLabel className="mb-3" label="Accepting Order">
            <Form.Select
              name="accepting_order"
              onChange={handleChange}
              value={values.accepting_order}
              disabled={(edit ? false : true) || loading}
            >
              <option value="">-- Choose status --</option>
              <option value="1">Accepting orders</option>
              <option value="0">Not accepting orders</option>
            </Form.Select>
            <ErrorMessage
              name="accepting_order"
              component="p"
              className="text-danger"
            />
          </FloatingLabel>
          <div className="d-grid gap-2">
            {!edit && (
              <Button
                variant="dark"
                onClick={() => setEdit(true)}
                disabled={userRole !== "Manager"}
              >
                Edit Setting
              </Button>
            )}
            {edit && (
              <>
                <Button type="submit" form="settingForm" disabled={loading}>
                  {!loading && "Apply changes"}
                  {loading && (
                    <>
                      <Spinner
                        as="span"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      <span>Updating account...</span>
                    </>
                  )}
                </Button>
                {!loading && (
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setEdit(false);
                      resetForm({ values: initialValues });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
