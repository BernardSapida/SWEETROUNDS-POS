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

import { getInitialValues, validationSchema } from "@/helpers/Products/Form";
import { updateProduct } from "@/helpers/Products/Methods";
import { Product } from "@/types/Product";

import Field from "@/components/form/InputField";

export default function ModalForm({
  modalShow,
  data,
  setModalShow,
  records,
}: {
  modalShow: boolean;
  data: Product;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  records: Product[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const initialValues = getInitialValues(data);

  const handleSubmit = async (values: Product) => {
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
  };

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
                Product Number: {data.product_number}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} id="modalForm">
                <Row>
                  <Col>
                    <Field
                      type="text"
                      name="name"
                      label="Name"
                      handleChange={handleChange}
                      value={data.name}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="text"
                      name="flavor"
                      label="Flavor"
                      handleChange={handleChange}
                      value={data.flavor}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="number"
                      name="price"
                      label="Price"
                      handleChange={handleChange}
                      value={data.price}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                  <Col>
                    <Field
                      type="number"
                      name="quantity"
                      label="Quantity"
                      handleChange={handleChange}
                      value={data.quantity}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      type="number"
                      name="quantity_sold"
                      label="Quantity Sold"
                      handleChange={handleChange}
                      value={data.quantity_sold}
                      loading={!edit || loading}
                      readOnly={true}
                    />
                  </Col>
                  <Col>
                    <FloatingLabel className="mt-3" label="Availability">
                      <Form.Select
                        name="availability"
                        onChange={handleChange}
                        value={values.availability}
                        disabled={(edit ? false : true) || loading}
                      >
                        <option value="">-- Select Availability --</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </Form.Select>
                      <ErrorMessage
                        name="availability"
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
                        />{" "}
                        <span>Applying changes...</span>
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
