import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Dispatch, SetStateAction, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { UserInformation } from "@/Types/UserInformation";
import { updateAccountStatus } from "@/helpers/Users/Methods";

export default function UserForm({
  modalShow,
  data,
  setModalShow,
  records,
}: {
  modalShow: boolean;
  data: UserInformation;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  records: UserInformation[];
}) {
  const [edit, setEdit] = useState(false);
  const initialValues = { ...data };

  const validationSchema = Yup.object({
    id: Yup.number().required("ID is required"),
    account_status: Yup.string().required("Account status is required"),
  });

  const handleSubmit = async (values: UserInformation) => {
    const response = await updateAccountStatus(values);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Account status successfully updated",
      });
    }

    updateUserRow(data);
    setEdit(false);
  };

  const updateUserRow = (data: Record<string, any>) => {
    for (let i = 0; i < records.length; i++) {
      if (records[i].id == data.id) {
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
                User ID: {data.id}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} id="userForm">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="id"
                    onChange={handleChange}
                    value={values.id}
                    hidden={true}
                    placeholder="Customer name"
                    readOnly
                    disabled={edit ? false : true}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    User Account Status <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="account_status"
                    onChange={handleChange}
                    value={values.account_status}
                    disabled={edit ? false : true}
                  >
                    <option value="">-- Select User Status --</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                  <ErrorMessage
                    name="account_status"
                    component="p"
                    className="text-danger"
                  />
                </Form.Group>
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
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      setEdit(false);
                      resetForm({ values: initialValues });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" form="userForm">
                    Apply Changes
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
