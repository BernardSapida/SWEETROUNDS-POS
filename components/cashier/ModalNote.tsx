import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Dispatch, SetStateAction, useRef } from "react";

export default function ModalNote(props: {
  show: boolean;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  setModalShow: Dispatch<SetStateAction<boolean>>;
}) {
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const save = () => {
    props.setModalShow(false);
    props.setNote(noteRef.current?.value!);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setModalShow(false)}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Additional Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel label="Note">
          <Form.Control
            as="textarea"
            placeholder="Leave a note here"
            name="note"
            style={{ height: "200px" }}
            ref={noteRef}
            defaultValue={props.note}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={() => save()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
