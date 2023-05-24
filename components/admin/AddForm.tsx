import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from "react";
import Swal from "sweetalert2";

import { createAdmin } from "@/helpers/admin";

export default function ModalForm(props: any) {
  const [loading, setLoading] = useState(false);
  const { modalShow, setModalShow } = props;

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await createAdmin(data);

    if (response.success) {
      setModalShow(false);
      displayAlertMessage(false);
    } else displayAlertMessage(true, response.message);
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create admin account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="modalAddForm">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Employee Firstname <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="employee_firstname"
                  placeholder="Employee Firstname"
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                  autoComplete="username"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                Role <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select name="role" disabled={loading} required>
                <option value="">-- Select Role --</option>
                <option value="Manager">Manager</option>
                <option value="Order Fulfillment Specialist">
                  Order Fulfillment Specialist
                </option>
                <option value="Cashier">Cashier</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="modalAddForm" disabled={loading}>
          {!loading && "Create account"}
          {loading && (
            <>
              <Spinner as="span" size="sm" role="status" aria-hidden="true" />{" "}
              <span>Creating an account...</span>
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
