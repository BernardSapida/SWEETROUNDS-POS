import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderTable from "./OrderTable";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { fetchOrders, updateStatus } from "@/helpers/orders";

export default function ModalForm(props: any) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const { modalShow, data, setModalShow, records } = props;

  useEffect(() => {
    const fetchAllOrders = async () => {
      const response = await fetchOrders(data);
      setUserOrder(response.data);
    };
    fetchAllOrders();
  }, [data]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await updateStatus(data);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order successfully updated",
      });
    }

    updateOrderRow(data);

    setEdit(false);
    setLoading(false);
  };

  const updateOrderRow = (data: Record<string, any>) => {
    for (let i = 0; i < records.length; i++) {
      if (records[i].id == data.id) {
        records[i].order_status = data.order_status;
        records[i].payment_status = data.payment_status;
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
          Order Number: {data.order_number}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="modalForm">
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="id"
                value={data.id}
                hidden={true}
                name="id"
                readOnly
                disabled={(edit ? false : true) || loading}
              />
            </Form.Group>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Customer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Customer name"
                  value={data.firstname + " " + data.lastname}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Order Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Order Quantity"
                  value={data.total_quantity}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Tax</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Tax"
                  value={data.tax}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Shipping Fee</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Shipping Fee"
                  value={data.shipping_fee}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Discount"
                  value={data.discount}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total"
                  value={data.total}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Order Status <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="order_status"
                  defaultValue={data.order_status}
                  disabled={(edit ? false : true) || loading}
                >
                  <option value="">-- Select Order Status --</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Payment Status <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="payment_status"
                  defaultValue={data.payment_status}
                  disabled={(edit ? false : true) || loading}
                >
                  <option value="">-- Select Payment Status --</option>
                  <option value="Not Completed">Not Completed</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <hr />
        <OrderTable data={userOrder} />
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
                  <span>Updating order...</span>
                </>
              )}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
