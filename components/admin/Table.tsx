import Placeholder from "react-bootstrap/Placeholder";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { fetchTableData } from "@/helpers/Admin/Methods";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import ModalForm from "@/components/admin/EditForm";
import AddForm from "@/components/admin/AddForm";

import { getBadgeColor } from "@/utils/badge";
import { Admin } from "@/types/Admin";

export default function Table({ userRole }: { userRole: string }) {
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
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
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetchTableData(keyword);
      setData(response.data);
      setTableLoading(false);
    };

    setPageLoading(false);
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
      <div className="d-flex justify-content-end mb-3">
        {pageLoading && (
          <Placeholder.Button
            xs={4}
            animation="glow"
            variant="primary"
            style={{ width: 150, height: 40 }}
          />
        )}
        {!pageLoading && (
          <Button
            onClick={() => {
              setModalAddShow(true);
            }}
            disabled={userRole !== "Manager"}
          >
            Add New Account
          </Button>
        )}
      </div>
      <Container className="bg-white p-4 rounded">
        <Row className="mb-3 align-items-center">
          <Col>
            <p className="fs-5 lh-1 my-1">
              {pageLoading && (
                <Placeholder animation="glow">
                  <Placeholder xs={4} style={{ borderRadius: 5 }} bg="dark" />
                </Placeholder>
              )}
              {!pageLoading && <strong>Employee Account</strong>}
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
                placeholder="Search an employee"
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
                <Spinner animation="grow" className="my-3" size="sm" />
                &nbsp; Loading...
              </span>
            }
          />
        )}
      </Container>
    </>
  );
}
