import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";

import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

import { updateProduct } from "@/helpers/products";

export default function ModalForm(props: any) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const { modalShow, data, setModalShow, records } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      flavor: "",
      price: "",
      quantity: "",
      availability: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      flavor: Yup.string().required("Flavor is required"),
      price: Yup.number().required("Price is required").min(0),
      quantity: Yup.number().required("Quantity is required").min(0),
      availability: Yup.string().required("Availability is required"),
    }),
    onSubmit: async (values) => {
      const { name, flavor, price, quantity, availability } = values;

      setLoading(true);

      data.name = name;
      data.flavor = flavor;
      data.price = price;
      data.quantity = quantity;
      data.availability = availability;

      const response = await updateProduct(data);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product successfully updated",
        });
      }

      updateProductRow(data);
      setEdit(false);
      setLoading(false);
    },
  });

  const updateProductRow = (data: Record<string, any>) => {
    for (let i = 0; i < records.length; i++) {
      if (records[i].id == data.id) {
        records[i].name = data.name;
        records[i].flavor = data.flavor;
        records[i].price = data.price;
        records[i].quantity = data.quantity;
        records[i].availability = data.availability;
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
          Product Number: {data.product_number}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="modalForm">
          <Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Customer name"
                value={data.id}
                hidden={true}
                name="id"
                readOnly
                disabled={(edit ? false : true) || loading}
              />
            </Form.Group>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  defaultValue={data.name}
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Flavor <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="flavor"
                  placeholder="Flavor"
                  defaultValue={data.flavor}
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Price <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
                  defaultValue={data.price}
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Quantity <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  defaultValue={data.quantity}
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Sold</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity_sold"
                  placeholder="Quantity sold"
                  value={data.quantity_sold}
                  readOnly
                  disabled={(edit ? false : true) || loading}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>
                  Availability <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="availability"
                  defaultValue={data.availability}
                  disabled={(edit ? false : true) || loading}
                >
                  <option value="">-- Select Availability --</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
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
                  />{" "}
                  <span>Applying changes...</span>
                </>
              )}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
