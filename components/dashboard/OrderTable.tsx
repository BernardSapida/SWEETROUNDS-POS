import Placeholder from "react-bootstrap/Placeholder";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState, useEffect } from "react";

import { fetchOrderByKeyword, fetchOrderList } from "@/helpers/Orders/Methods";
import { numberFormat } from "@/helpers/format";
import { getBadgeColor } from "@/utils/badge";
import { Order } from "@/types/Order";

export default function OrderTable({ pageLoading }: { pageLoading: boolean }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Order[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchOrderList();
      else response = await fetchOrderByKeyword(keyword);

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
      name: "ORDER #",
      selector: (row: Record<any, any>) => row.order_number,
      sortable: true,
    },
    {
      name: "CUSTOMER",
      selector: (row: Record<any, any>) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "QUANTITY",
      selector: (row: Record<any, any>) => numberFormat(row.quantity),
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row: Record<any, any>) => `Php ${numberFormat(row.total)}`,
      sortable: true,
    },
    {
      name: "ORDER STATUS",
      selector: (row: Record<any, any>) => row.order_status,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.order_status)}>
          {row.order_status}
        </Badge>
      ),
    },
  ];

  return (
    <Container className="bg-white p-4 rounded">
      <Row className="mb-3">
        <Col>
          <p className="fs-5 lh-1 my-1">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder xs={4} style={{ borderRadius: 5 }} bg="dark" />
              </Placeholder>
            )}
            {!pageLoading && <strong>Orders</strong>}
          </p>
          <p className="fs-6 lh-1 my-1 text-secondary">
            {pageLoading && (
              <Placeholder animation="glow">
                <Placeholder
                  xs={8}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!pageLoading && "Overview of Latest Month"}
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
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search an order"
                  onChange={handleSearchInput}
                />
              </Form.Group>
            </Form>
          )}
        </Col>
      </Row>
      {pageLoading && (
        <Placeholder animation="glow">
          <Placeholder
            className="w-100"
            style={{ borderRadius: 5, height: 600 }}
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
          progressPending={loading}
          progressComponent={
            <span className="d-flex align-items-center">
              <Spinner animation="grow" className="my-3" size="sm" /> &nbsp;
              Loading...
            </span>
          }
        />
      )}
    </Container>
  );
}
