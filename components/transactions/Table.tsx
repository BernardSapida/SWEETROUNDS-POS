import Placeholder from "react-bootstrap/Placeholder";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState, useEffect } from "react";
import ModalForm from "@/components/transactions/ModalForm";

import {
  fetchTransactionList,
  fetchTransactionListByKeyword,
} from "@/helpers/Transactions/Methods";
import { Transaction } from "@/types/Transaction";

export default function Table() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tableLoading, setLoadingTable] = useState<boolean>(true);
  const [pageLoading, setLoadingPage] = useState<boolean>(true);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [data, setData] = useState<Transaction[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    setLoadingTable(true);
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchTransactionList();
      else response = await fetchTransactionListByKeyword(keyword);

      setData(response.data);
      setLoadingTable(false);
    };

    setLoadingPage(false);
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
      />
      <Container className="bg-white p-4 rounded">
        <Row className="mb-3 align-items-center">
          <Col>
            <p className="fs-5 lh-1 my-1">
              {pageLoading && (
                <Placeholder animation="glow">
                  <Placeholder xs={4} style={{ borderRadius: 5 }} bg="dark" />
                </Placeholder>
              )}
              {!pageLoading && <strong>Cashier Transaction</strong>}
            </p>
          </Col>
          <Col>
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  className="w-100"
                  style={{ borderRadius: 5, height: 40 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && (
              <Form.Control
                type="text"
                placeholder="Search a transaction"
                onChange={handleSearchInput}
              />
            )}
          </Col>
        </Row>
        {pageLoading && (
          <Placeholder animation="glow">
            <Placeholder
              className="w-100"
              style={{ borderRadius: 5, height: 550 }}
              bg="secondary"
            />
          </Placeholder>
        )}
        {!pageLoading && (
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
            progressPending={tableLoading}
            progressComponent={
              <span className="d-flex align-items-center">
                <Spinner animation="grow" className="my-3" size="sm" /> &nbsp;
                Loading...
              </span>
            }
          />
        )}
      </Container>
    </>
  );
}
