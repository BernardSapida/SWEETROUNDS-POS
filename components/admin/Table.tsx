import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { fetchTableData } from "@/helpers/Admin/Methods";

const ModalForm = dynamic(() => import("@/components/admin/EditForm"), {
  ssr: false,
});
const AddForm = dynamic(() => import("@/components/admin/AddForm"), {
  ssr: false,
});
import { getBadgeColor } from "@/utils/badge";
import { Admin } from "@/Types/AdminTypes";

export default function Table(props: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<Admin>({
    id: -1,
    account_status: "",
    email: "",
    employee_firstname: "",
    employee_lastname: "",
    online_status: "",
    password: "",
    role: "",
    created_at: "",
    updated_at: "",
  });
  const [data, setData] = useState<Admin[]>([]);
  const [keyword, setKeyword] = useState("");
  const { userRole } = props;

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchTableData(keyword);
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
      name: "FIRSTNAME",
      selector: (row: Record<any, any>) => row.employee_firstname,
      sortable: true,
    },
    {
      name: "LASTNAME",
      selector: (row: Record<any, any>) => row.employee_lastname,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: Record<any, any>) => row.email,
      sortable: true,
    },
    {
      name: "ROLE",
      selector: (row: Record<any, any>) => row.role,
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
      cell: (row: Admin) => (
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
      <AddForm modalShow={modalAddShow} setModalShow={setModalAddShow} />
      <Button
        className="d-block ms-auto mb-3"
        onClick={() => {
          setModalAddShow(true);
        }}
        disabled={userRole !== "Manager"}
      >
        Add New Account
      </Button>
      <Container className="bg-white p-4 rounded">
        <Row className="mb-3">
          <Col>
            <p className="fs-5 lh-1 my-1">
              <strong>Employee Account</strong>
            </p>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search an employee"
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
              <Spinner animation="grow" className="my-3" size="sm" />
              &nbsp; Loading...
            </span>
          }
        />
      </Container>
    </>
  );
}
