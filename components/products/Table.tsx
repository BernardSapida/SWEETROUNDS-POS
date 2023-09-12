import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ModalForm = dynamic(() => import("@/components/products/ModalForm"), {
  ssr: false,
});
import { getBadgeColor } from "@/utils/badge";
import { Product } from "@/types/Product";
import {
  fetchProductList,
  fetchProductByKeyword,
} from "@/helpers/Products/Methods";

export default function Table({ userRole }: { userRole: string }) {
  const [tableLoading, setLoadingTable] = useState<boolean>(true);
  const [pageLoading, setLoadingPage] = useState<boolean>(true);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<Product>({});
  const [data, setData] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    setLoadingTable(true);
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchProductList();
      else response = await fetchProductByKeyword(keyword);

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
          View
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
        <Row className="mb-3 align-items-center">
          <Col>
            <p className="fs-5 lh-1 my-1">
              {pageLoading && (
                <Placeholder animation="glow">
                  <Placeholder xs={4} style={{ borderRadius: 5 }} bg="dark" />
                </Placeholder>
              )}
              {!pageLoading && <strong>Product Inventory</strong>}
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
                placeholder="Search a product"
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
