import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderTable from "./OrderTable";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2";

import { getInitialValues, validationSchema } from "@/helpers/Orders/Form";
import { fetchUserOrders, updateStatus } from "@/helpers/Orders/Methods";
import { Order } from "@/types/Order";

import Field from "@/components/form/InputField";

export default function ModalForm({
  modalShow,
  data,
  setModalShow,
  records,
}: {
  modalShow: boolean;
  data: Order;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  records: Order[];
}) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const initialValues = getInitialValues(data);

  const handleSubmit = async (values: Order) => {
    const { order_status, payment_status } = values;

    setLoading(true);

    data.order_status = order_status;
    data.payment_status = payment_status;

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

  useEffect(() => {
    const fetchAllOrders = async () => {
      const response = await fetchUserOrders(data);
      setUserOrder(response.data);
    };

    fetchAllOrders();
  }, [data]);

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
                Order Number: {data.order_number}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} id="modalForm">
                <Row>
                  <Col>
                    <Field
                      type="text"
                      name="tax"
                      label="Customer name"
                      handleChange={handleChange}
                      value={data.firstname + " " + data.lastname}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="text"
                      name="total_quantity"
                      label="Order Quantity"
                      handleChange={handleChange}
                      value={data.total_quantity}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="text"
                      name="tax"
                      label="Tax"
                      handleChange={handleChange}
                      value={data.tax}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="text"
                      name="shipping_fee"
                      label="Shipping Fee"
                      handleChange={handleChange}
                      value={data.shipping_fee}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="text"
                      name="discount"
                      label="Discount"
                      handleChange={handleChange}
                      value={data.discount}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="text"
                      name="total"
                      label="Total"
                      handleChange={handleChange}
                      value={data.total}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel className="mt-3 mb-3" label="Order Status">
                      <Form.Select
                        as="select"
                        name="order_status"
                        onChange={handleChange}
                        value={values.order_status}
                        disabled={(edit ? false : true) || loading}
                      >
                        <option value="">-- Select Order Status --</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>
                      <ErrorMessage
                        name="order_status"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel className="mt-3 mb-3" label="Payment Status">
                      <Form.Select
                        as="select"
                        name="payment_status"
                        onChange={handleChange}
                        value={values.payment_status}
                        disabled={(edit ? false : true) || loading}
                      >
                        <option value="">-- Select Payment Status --</option>
                        <option value="Not Completed">Not Completed</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                      <ErrorMessage
                        name="payment_status"
                        component="p"
                        className="text-danger"
                      />
                    </FloatingLabel>
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
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setEdit(false);
                        resetForm({
                          values: {
                            order_status: data.order_status,
                            payment_status: data.payment_status,
                          },
                        });
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
                        <span>Updating order...</span>
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
