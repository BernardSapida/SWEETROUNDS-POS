import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Dispatch, SetStateAction, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2";

import { updateAccountStatus } from "@/helpers/Users/Methods";
import { UserInformation } from "@/types/UserInformation";
import { validationSchema } from "@/helpers/Users/Form";

import Field from "@/components/form/InputField";

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

  const handleSubmit = async (values: UserInformation) => {
    const response = await updateAccountStatus(values);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Account status successfully updated",
      });
    }

    updateUserRow(values);
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
                <FloatingLabel label="User Account Status">
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
                </FloatingLabel>
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
