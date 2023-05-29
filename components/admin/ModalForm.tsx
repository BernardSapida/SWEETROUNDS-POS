import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { Dispatch, SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { updateAdmin } from "@/helpers/admin";
import { Admin } from "@/Types/AdminTypes";

export default function ModalForm({
  modalShow,
  data,
  setModalShow,
  records,
}: {
  modalShow: boolean;
  data: Admin;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  records: Admin[];
}) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const displayAlertMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Account successfully updated",
    });
    setEdit(false);
    setLoading(false);
  };

  const updateAdminRow = (data: Record<string, any>) => {
    for (let i = 0; i < records.length; i++) {
      if (records[i].id == data.id) {
        records[i].employee_firstname = data.employee_firstname;
        records[i].employee_lastname = data.employee_lastname;
        records[i].email = data.email;
        records[i].role = data.role;
        records[i].account_status = data.account_status;
      }
    }
  };

  const initialValues = {
    employee_firstname: data.employee_firstname,
    employee_lastname: data.employee_lastname,
    email: data.email,
    password: "",
    role: data.role,
    account_status: data.account_status,
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
    account_status: Yup.string().required("Account status is required"),
  });

  const handleSubmit = async (
    values: Admin,
    { resetForm }: { resetForm: any }
  ) => {
    const {
      employee_firstname,
      employee_lastname,
      email,
      role,
      account_status,
    } = values;
    setLoading(true);

    data.employee_firstname = employee_firstname;
    data.employee_lastname = employee_lastname;
    data.email = email;
    data.role = role;
    data.account_status = account_status;

    const response = await updateAdmin(data);

    if (response.success) displayAlertMessage();
    else {
      setLoading(false);
      setEdit(false);
      resetForm({
        values: {
          employee_firstname: data.employee_firstname,
          employee_lastname: data.employee_lastname,
          email: data.email,
          password: "",
          role: data.role,
          account_status: data.account_status,
        },
      });
    }

    setLoading(false);

    updateAdminRow(data);
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        setEdit(false);
      }}
      backdrop="static"
      size="lg"
      centered
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, resetForm }) => (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Admin ID: {data.id}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FloatingLabel className="mb-3" label="Employee Firstname">
                      <Form.Control
                        type="text"
                        name="employee_firstname"
                        onChange={handleChange}
                        value={values.employee_firstname}
                        placeholder="Employee Firstname"
                        disabled={(edit ? false : true) || loading}
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
                        disabled={(edit ? false : true) || loading}
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
                    <FloatingLabel className="mb-3" label="Email Address">
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        autoComplete="username"
                        placeholder="Email Address"
                        disabled={(edit ? false : true) || loading}
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
                        autoComplete="current-password"
                        placeholder="Password"
                        disabled={(edit ? false : true) || loading}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel className="mb-3" label="Role">
                      <Form.Select
                        name="role"
                        onChange={handleChange}
                        value={values.role}
                        disabled={(edit ? false : true) || loading}
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
                  <Col>
                    <FloatingLabel className="mb-3" label="Account Status">
                      <Form.Select
                        name="account_status"
                        onChange={handleChange}
                        value={values.account_status}
                        disabled={(edit ? false : true) || loading}
                      >
                        <option value="">-- Select Status --</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Select>
                      <ErrorMessage
                        name="account_status"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!edit && (
                <Button variant="dark" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
              {edit && (
                <>
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
                  <Button type="submit" form="modalForm" disabled={loading}>
                    {!loading && "Apply changes"}
                    {loading && (
                      <>
                        <Spinner
                          as="span"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        &nbsp;
                        <span>Updating account...</span>
                      </>
                    )}
                  </Button>
                </>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}
