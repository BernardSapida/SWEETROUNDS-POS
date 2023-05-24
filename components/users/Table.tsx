import Badge from "react-bootstrap/Badge";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";

const ModalForm = dynamic(() => import("@/components/users/ModalForm"), {
  ssr: false,
});
import { getBadgeColor } from "@/utils/badge";

export default function Table(props: any) {
  const { userRole } = props;
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (keyword === "") {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/users/list`
        );

        setData(response.data.data);
        setLoading(false);
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/users/search`,
          {
            keyword: keyword,
          }
        );

        setData(response.data.data);
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  const handleSearchInput = (event: any) => {
    const value = event.target.value;
    setKeyword(value);
  };

  const table_columns = [
    {
      name: "FULLNAME",
      selector: (row: Record<any, any>) => row.fullname,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: Record<any, any>) => row.email,
      sortable: true,
    },
    {
      name: "PASSWORD",
      selector: (row: Record<any, any>) => row.password,
      sortable: true,
    },
    {
      name: "AUTH PROVIDER",
      selector: (row: Record<any, any>) => row.auth_provider,
      sortable: true,
    },
    {
      name: "ADDRESS LINE 1",
      selector: (row: Record<any, any>) => row.address_line_1 || "Not set",
      sortable: true,
    },
    {
      name: "ADDRESS LINE 2",
      selector: (row: Record<any, any>) => row.address_line_2 || "Not set",
      sortable: true,
    },
    {
      name: "CITY",
      selector: (row: Record<any, any>) => row.city || "Not set",
      sortable: true,
    },
    {
      name: "ACCOUNT STATUS",
      selector: (row: Record<any, any>) => row.account_status,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.account_status)}>
          {row.account_status}
        </Badge>
      ),
    },
    {
      name: "ONLINE STATUS",
      selector: (row: Record<any, any>) => row.online_status,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.online_status)}>
          {row.online_status}
        </Badge>
      ),
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
          disabled={userRole !== "Manager"}
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
              <strong>Customers Account</strong>
            </p>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search a customer"
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
