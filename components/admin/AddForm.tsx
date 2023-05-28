import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { Dispatch, SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Admin } from "@/Types/AdminTypes";

import { createAdmin } from "@/helpers/admin";

export default function ModalForm({
  modalShow,
  setModalShow,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);

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

  const initialValues = {
    employee_firstname: "",
    employee_lastname: "",
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
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
                    <FloatingLabel className="mb-3" label="Employee Firstname">
                      <Form.Control
                        type="text"
                        name="employee_firstname"
                        onChange={handleChange}
                        value={values.employee_firstname}
                        placeholder="Employee Firstname"
                        disabled={loading}
                      />
                      <ErrorMessage
                        name="employee_firstname"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel className="mb-3" label="Employee Lastname">
                      <Form.Control
                        type="text"
                        name="employee_lastname"
                        onChange={handleChange}
                        value={values.employee_lastname}
                        placeholder="Employee Lastname"
                        disabled={loading}
                      />
                      <ErrorMessage
                        name="employee_lastname"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel className="mb-3" label="Email address">
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        placeholder="Email"
                        disabled={loading}
                        autoComplete="username"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel className="mb-3" label="Password">
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Password"
                        autoComplete="current-password"
                        disabled={loading}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
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
