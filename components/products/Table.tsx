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

const ModalForm = dynamic(() => import("@/components/products/ModalForm"), {
  ssr: false,
});
import { getBadgeColor } from "@/utils/badge";
import { fetchProductList, fetchProductByKeyword } from "@/helpers/products";

export default function Table(props: any) {
  const { userRole } = props;
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  let [data, setData] = useState([]);
  let [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchProductList();
      else response = await fetchProductByKeyword(keyword);

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
      name: "PRODUCT #",
      selector: (row: Record<any, any>) => row.product_number,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row: Record<any, any>) => row.name,
      sortable: true,
    },
    {
      name: "FLAVOR",
      selector: (row: Record<any, any>) => row.flavor,
      sortable: true,
    },
    {
      name: "PRICE",
      selector: (row: Record<any, any>) => row.price,
      sortable: true,
    },
    {
      name: "QUANTITY",
      selector: (row: Record<any, any>) => row.quantity,
      sortable: true,
    },
    {
      name: "QUANTITY SOLD",
      selector: (row: Record<any, any>) => row.quantity_sold,
      sortable: true,
    },
    {
      name: "AVAILABILITY",
      selector: (row: Record<any, any>) => row.availability,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.availability)}>
          {row.availability}
        </Badge>
      ),
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
              <strong>Product Inventory</strong>
            </p>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search a product"
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
