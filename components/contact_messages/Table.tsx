import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState, useEffect } from "react";

import { ContactMessage } from "@/types/ContactMessage";
import {
  fetchContactMessages,
  fetchContactMessagesByKeyword,
} from "@/helpers/ContactMessages/Methods";

import ModalForm from "@/components/contact_messages/ModalForm";

export default function Table() {
  const [loading, setLoading] = useState<boolean>(true);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactMessage>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  let [data, setData] = useState<ContactMessage[]>([]);
  let [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchContactMessages();
      else response = await fetchContactMessagesByKeyword(keyword);

      setData(response.data);
      setLoading(false);
    };

    fetchData();
  }, [keyword]);

  const handleSearchInput = (event: any) => {
    const value = event.target.value;
    setKeyword(value);
  };

  const table_columns = [
    {
      name: "NAME",
      selector: (row: ContactMessage) => row.name,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: ContactMessage) => row.email,
      sortable: true,
    },
    {
      name: "SUBJECT",
      selector: (row: ContactMessage) => row.subject,
      sortable: true,
    },
    {
      name: "MESSAGE",
      selector: (row: ContactMessage) => row.message,
      sortable: true,
    },
    {
      button: true,
      cell: (row: ContactMessage) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            setFormData(row);
            setModalShow(true);
          }}
        >
          View Message
        </Button>
      ),
    },
  ];

  return (
    <>
      <ModalForm
        modalShow={modalShow}
        setModalShow={setModalShow}
        data={formData}
      />
      <Container className="bg-white p-4 rounded">
        <Row className="mb-3">
          <Col>
            <p className="fs-5 lh-1 my-1">
              <strong>Contact Messages</strong>
            </p>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search a message"
              onChange={handleSearchInput}
            />
          </Col>
        </Row>
        <DataTable
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#212529",
                color: "white",
                fontSize: "16px",
                fontFamily: "system-ui, -apple-system",
              },
            },
            rows: {
              style: {
                fontSize: "16px",
                fontFamily: "system-ui, -apple-system",
              },
            },
          }}
          columns={table_columns}
          data={data}
          pagination
          persistTableHead
          responsive={true}
          striped={true}
          highlightOnHover={true}
          progressPending={loading}
          progressComponent={
            <span className="d-flex align-items-center">
              <Spinner animation="grow" className="my-3" size="sm" /> &nbsp;
              Loading...
            </span>
          }
        />
      </Container>
    </>
  );
}
