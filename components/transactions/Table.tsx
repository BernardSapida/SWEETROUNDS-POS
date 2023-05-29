import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalForm = dynamic(() => import("@/components/transactions/ModalForm"), {
  ssr: false,
});
import {
  fetchTransactionList,
  fetchTransactionListByKeyword,
} from "@/helpers/Transactions/Methods";

export default function Table() {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  let [data, setData] = useState([]);
  let [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchTransactionList();
      else response = await fetchTransactionListByKeyword(keyword);

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
      name: "INVOICE ID",
      selector: (row: Record<any, any>) => row.invoice_id,
      sortable: true,
    },
    {
      name: "DONUT QUANTITY",
      selector: (row: Record<any, any>) => row.quantity,
      sortable: true,
    },
    {
      name: "DISCOUNT",
      selector: (row: Record<any, any>) => row.discount,
      sortable: true,
    },
    {
      name: "TAX",
      selector: (row: Record<any, any>) => row.tax,
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row: Record<any, any>) => row.total,
      sortable: true,
    },
    {
      name: "CREATED AT",
      selector: (row: Record<any, any>) => row.created_at,
      sortable: true,
    },
    {
      button: true,
      cell: (row: Record<any, any>) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            setFormData(row);
            setModalShow(true);
          }}
        >
          View Details
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
        records={data}
      />
      <Container className="bg-white p-4 rounded">
        <Row className="mb-3">
          <Col>
            <p className="fs-5 lh-1 my-1">
              <strong>Cashier Transaction</strong>
            </p>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search a transaction"
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
          defaultSortFieldId={1}
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
