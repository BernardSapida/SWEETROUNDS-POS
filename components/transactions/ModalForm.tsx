import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import OrderTable from "./OrderTable";

import { useEffect, useState } from "react";
import { fetchTransactionItems } from "@/helpers/Transactions/Methods";

export default function ModalForm(props: any) {
  const { modalShow, data, setModalShow } = props;
  const [transactionItems, setTransactionItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetchTransactionItems(data);
      setTransactionItems(response.data);
    };

    fetchItems();
  }, [data]);

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
          Order Number: {data.order_number}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="id"
                value={data.id}
                hidden={true}
                name="id"
                readOnly
              />
            </Form.Group>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Admin ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Admin ID"
                  value={data.admin_id}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Invoice ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Invoice ID"
                  value={data.invoice_id}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Tax</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tax"
                  value={`Php ${data.tax}`}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Discount"
                  value={`Php ${data.discount}`}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Donut Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Discount"
                  value={`${data.quantity} pcs`}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Discount"
                  value={`Php ${data.total}`}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <FloatingLabel label="Note">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={data.note}
              style={{ height: 100 }}
              readOnly
            />
          </FloatingLabel>
        </Form>
        <hr />
        <OrderTable data={transactionItems} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => setModalShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
