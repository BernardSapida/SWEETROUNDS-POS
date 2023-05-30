import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderTable from "./OrderTable";

import { fetchTransactionItems } from "@/helpers/Transactions/Methods";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Transaction } from "@/types/Transaction";

export default function ModalForm({
  modalShow,
  data,
  setModalShow,
}: {
  modalShow: boolean;
  data: Transaction;
  setModalShow: Dispatch<SetStateAction<boolean>>;
}) {
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
          Invoice ID: {data.invoice_id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Admin ID">
                <Form.Control
                  type="text"
                  placeholder="Admin ID"
                  value={data.admin_id}
                  readOnly
                />
              </FloatingLabel>
            </Col>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Invoice ID">
                <Form.Control
                  type="text"
                  placeholder="Invoice ID"
                  value={data.invoice_id}
                  readOnly
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Tax">
                <Form.Control
                  type="text"
                  placeholder="Tax"
                  value={`Php ${data.tax}`}
                  readOnly
                />
              </FloatingLabel>
            </Col>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Discount">
                <Form.Control
                  type="text"
                  placeholder="Discount"
                  value={`Php ${data.discount}`}
                  readOnly
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Donut Quantity">
                <Form.Control
                  type="text"
                  placeholder="Donut quantity"
                  value={`${data.quantity} pcs`}
                  readOnly
                />
              </FloatingLabel>
            </Col>
            <Col md={6} sm={12}>
              <FloatingLabel className="mb-3" label="Total">
                <Form.Control
                  type="text"
                  placeholder="Total amount"
                  value={`Php ${data.total}`}
                  readOnly
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel label="Note">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={data.note}
              style={{ height: 150 }}
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
