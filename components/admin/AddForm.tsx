import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Dispatch, SetStateAction, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2";

import { getInitialValues, validationSchema } from "@/helpers/Admin/AddForm";
import { createAdmin } from "@/helpers/Admin/Methods";
import { Admin } from "@/Types/Admin";

import Field from "@/components/admin/InputField";

export default function ModalForm({
  modalShow,
  setModalShow,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const initialValues = getInitialValues();

  const displayAlertMessage = (
    error: boolean,
    message: string | null = null
  ) => {
    Swal.fire({
      icon: `${error ? "error" : "success"}`,
      title: `${error ? "Invalid Input" : "Account Created"}`,
      text: `${error ? message : "Admin account successfully created!"}`,
    });
    setLoading(false);
  };

  const handleSubmit = async (
    values: Admin,
    { resetForm }: { resetForm: any }
  ) => {
    setLoading(true);

    const response = await createAdmin(values);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order successfully updated",
      });
    }

    if (response.success) {
      setModalShow(false);
      displayAlertMessage(false);
      resetForm();
    } else displayAlertMessage(true, response.message);
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      backdrop="static"
      size="lg"
      centered
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values }) => (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create admin account
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} id="modalAddForm">
                <Row>
                  <Col>
                    <Field
                      type="text"
                      name="employee_firstname"
                      label="Employee Firstname"
                      handleChange={handleChange}
                      value={values.employee_firstname}
                      loading={loading}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="text"
                      name="employee_lastname"
                      label="Employee Lastname"
                      handleChange={handleChange}
                      value={values.employee_lastname}
                      loading={loading}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="email"
                      name="email"
                      label="Email Address"
                      handleChange={handleChange}
                      value={values.email}
                      loading={loading}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      handleChange={handleChange}
                      value={values.password}
                      loading={loading}
                    />
                  </Col>
                </Row>
                <Col>
                  <FloatingLabel className="mb-3" label="Role">
                    <Form.Select
                      name="role"
                      onChange={handleChange}
                      value={values.role}
                      disabled={loading}
                    >
                      <option value="">-- Select Role --</option>
                      <option value="Manager">Manager</option>
                      <option value="Order Fulfillment Specialist">
                        Order Fulfillment Specialist
                      </option>
                      <option value="Cashier">Cashier</option>
                    </Form.Select>
                    <ErrorMessage
                      name="role"
                      component="p"
                      className="text-danger"
                    />
                  </FloatingLabel>
                </Col>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="modalAddForm" disabled={loading}>
                {!loading && "Create account"}
                {loading && (
                  <>
                    <Spinner
                      as="span"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    <span>Creating an account...</span>
                  </>
                )}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}
