import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { useState } from "react";
import Swal from "sweetalert2";

import { updateAdmin } from "@/helpers/admin";

export default function ModalForm(props: any) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const { modalShow, data, setModalShow, records } = props;

  const displayAlertMessage = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Account successfully updated",
    });
    setEdit(false);
    setLoading(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await updateAdmin(data);

    if (response.success) displayAlertMessage();
    else {
      setLoading(false);
      setEdit(false);
    }

    updateAdminRow(data);
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

  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        setEdit(false);
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Admin ID: {data.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="modalForm">
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="ID"
                value={data.id}
                hidden={true}
                name="id"
                readOnly
                disabled={(edit ? false : true) || loading}
                required
              />
            </Form.Group>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Employee Firstname <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="employee_firstname"
                  placeholder="Employee Firstname"
                  defaultValue={data.employee_firstname}
                  disabled={(edit ? false : true) || loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Employee Lastname <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="employee_lastname"
                  placeholder="Employee Lastname"
                  defaultValue={data.employee_lastname}
                  disabled={(edit ? false : true) || loading}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={data.email}
                  autoComplete="username"
                  disabled={(edit ? false : true) || loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Role <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="role"
                  defaultValue={data.role}
                  disabled={(edit ? false : true) || loading}
                  required
                >
                  <option value="">-- Select Role --</option>
                  <option value="Manager">Manager</option>
                  <option value="Order Fulfillment Specialist">
                    Order Fulfillment Specialist
                  </option>
                  <option value="Cashier">Cashier</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Account Status <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="account_status"
                  defaultValue={data.status}
                  disabled={(edit ? false : true) || loading}
                  required
                >
                  <option value="">-- Select Status --</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
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
              <Button variant="outline-dark" onClick={() => setEdit(false)}>
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
    </Modal>
  );
}
