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

import { getInitialValues, validationSchema } from "@/helpers/Admin/EditForm";
import { updateAdmin, updateInformation } from "@/helpers/Admin/Methods";
import { Admin } from "@/types/Admin";

import Field from "@/components/form/InputField";

export default function EditForm({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const initialValues = getInitialValues(data);

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

  const handleSubmit = async (
    values: Admin,
    { resetForm }: { resetForm: any }
  ) => {
    setLoading(true);
    const updatedInformation = updateInformation(data, values);
    const response = await updateAdmin(updatedInformation);

    if (response.success) displayAlertMessage();
    else {
      setLoading(false);
      setEdit(false);
      resetForm({ values: initialValues });
    }

    setLoading(false);
    updateAdminRow(updatedInformation);
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
              <Form onSubmit={handleSubmit} id="editForm">
                <Row>
                  <Col md={6} sm={12}>
                    <Field
                      type="text"
                      name="employee_firstname"
                      label="Employee Firstname"
                      handleChange={handleChange}
                      value={values.employee_firstname}
                      loading={(edit ? false : true) || loading}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <Field
                      type="text"
                      name="employee_lastname"
                      label="Employee Lastname"
                      handleChange={handleChange}
                      value={values.employee_lastname}
                      loading={(edit ? false : true) || loading}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <Field
                      type="text"
                      name="email"
                      label="Email Address"
                      handleChange={handleChange}
                      value={values.email}
                      loading={(edit ? false : true) || loading}
                    />
                  </Col>
                  <Col md={6} sm={12}>
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      handleChange={handleChange}
                      value={values.password}
                      loading={(edit ? false : true) || loading}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} sm={12}>
                    <FloatingLabel className="mt-3" label="Role">
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
                  <Col md={6} sm={12}>
                    <FloatingLabel className="mt-3" label="Account Status">
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
                  <Button type="submit" form="editForm" disabled={loading}>
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
