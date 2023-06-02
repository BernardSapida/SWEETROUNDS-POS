import { Dispatch, SetStateAction } from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ContactMessage } from "@/types/ContactMessage";

export default function ModalForm({
  modalShow,
  data,
  setModalShow,
}: {
  modalShow: boolean;
  data: ContactMessage;
  setModalShow: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      backdrop="static"
      centered
    >
      <Modal.Header id="alert" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Message ID: {data.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Sender Name">
                <Form.Control
                  type="text"
                  placeholder="Sender name"
                  value={data.name}
                  readOnly
                />
              </FloatingLabel>
            </Col>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Sender Email">
                <Form.Control
                  type="text"
                  placeholder="Sender email"
                  value={data.email}
                  readOnly
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Col>
            <FloatingLabel className="mb-3" label="Subject">
              <Form.Control
                type="text"
                placeholder="Subject"
                value={data.subject}
                readOnly
              />
            </FloatingLabel>
          </Col>
          <FloatingLabel label="Message">
            <Form.Control
              as="textarea"
              placeholder="Sender message"
              value={data.message}
              style={{ height: 150 }}
              readOnly
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => setModalShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
