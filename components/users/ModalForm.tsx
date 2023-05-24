import Fade from "react-bootstrap/Fade";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { updateAccountStatus } from "@/helpers/users";
import Swal from "sweetalert2";

export default function ModalForm(props: any) {
  const [edit, setEdit] = useState(false);
  const { modalShow, data, setModalShow, records } = props;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await updateAccountStatus(data);

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
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User ID: {data.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="modalForm">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Customer name"
              value={data.id}
              hidden={true}
              name="id"
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
              defaultValue={data.account_status}
              disabled={edit ? false : true}
            >
              <option value="">-- Select User Status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
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
            <Button variant="outline-dark" onClick={() => setEdit(false)}>
              Cancel
            </Button>
            <Button type="submit" form="modalForm">
              Apply Changes
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
