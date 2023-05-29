import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useRef } from "react";

export default function ModalNote(props: any) {
  let { modalShow, setModalShow, note, setNote } = props;
  let noteRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Additional Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingTextarea2" label="Note">
          <Form.Control
            as="textarea"
            placeholder="Leave a note here"
            name="note"
            style={{ height: "200px" }}
            ref={noteRef}
            defaultValue={note}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            setModalShow(false);
            setNote(noteRef.current?.value);
          }}
        >
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
