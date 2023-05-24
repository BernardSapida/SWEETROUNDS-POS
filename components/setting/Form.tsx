import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { readSetting, updateSetting } from "@/helpers/setting";

export default function ModalForm(props: any) {
  const [setting, setSetting] = useState<Record<string, number>>({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userRole } = props;

  useEffect(() => {
    const fetchSetting = async () => {
      const response = await readSetting();
      setSetting(response.data);
    };

    fetchSetting();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const response = await updateSetting(data);

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Setting successfully updated",
      });
    }

    setEdit(false);
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} id="modalForm">
      <Form.Group className="mb-3">
        <Form.Label>
          Tax Rate: <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          name="tax"
          placeholder="Tax rate"
          defaultValue={setting.tax}
          disabled={(edit ? false : true) || loading}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Discount: <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          name="discount"
          placeholder="Discount"
          defaultValue={setting.discount}
          disabled={(edit ? false : true) || loading}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Shipping Fee: <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          name="shipping_fee"
          placeholder="Shipping Fee"
          defaultValue={setting.shipping_fee}
          disabled={(edit ? false : true) || loading}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Accepting Order <span className="text-danger">*</span>
        </Form.Label>
        <Form.Select
          name="accepting_order"
          value={setting.accepting_order}
          disabled={(edit ? false : true) || loading}
          required
        >
          <option value="">-- Accepting Orders --</option>
          <option value="1">Accepting orders</option>
          <option value="0">Not accepting orders</option>
        </Form.Select>
      </Form.Group>
      <div className="d-grid gap-2">
        {!edit && (
          <Button
            variant="dark"
            onClick={() => setEdit(true)}
            disabled={userRole !== "Manager"}
          >
            Edit Setting
          </Button>
        )}
        {edit && (
          <>
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
                  <span>Updating account...</span>
                </>
              )}
            </Button>
            {!loading && (
              <Button variant="outline-dark" onClick={() => setEdit(false)}>
                Cancel
              </Button>
            )}
          </>
        )}
      </div>
    </Form>
  );
}
