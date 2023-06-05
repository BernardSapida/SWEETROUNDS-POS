import Placeholder from "react-bootstrap/Placeholder";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import { TiPlus, TiMinus } from "react-icons/ti";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  fetchProductsList,
  fetchProductByKeyword,
} from "@/helpers/Cashier/Methods";
import { getBadgeColor } from "@/utils/badge";

export default function Table(props: any) {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { data, setData, updateOrder, reduceOrder, order, pageLoading } = props;

  useEffect(() => {
    const fetchData = async () => {
      let response: any;

      if (keyword === "") response = await fetchProductsList();
      else response = await fetchProductByKeyword(keyword);

      setData(response.data);
      setLoading(false);
    };

    fetchData();
  }, [keyword, order, setData]);

  const handleSearchInput = (event: any) => {
    const value = event.target.value;
    setKeyword(value);
  };

  const table_columns = [
    {
      name: "ACTION",
      button: true,
      cell: (row: Record<any, any>) => (
        <>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => reduceOrder(row.id)}
            disabled={row.availability != "Available"}
          >
            <TiMinus />
          </Button>
          &nbsp;
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => updateOrder(row)}
            disabled={row.availability != "Available"}
          >
            <TiPlus />
          </Button>
        </>
      ),
    },
    {
      name: "IMAGE",
      selector: (row: Record<any, any>) => row.image,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Image
          src={`/donuts/${row["image"]}`}
          height={60}
          width={60}
          alt="Donut Image"
          className="my-2"
        ></Image>
      ),
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
      name: "AVAILABILITY",
      selector: (row: Record<any, any>) => row.availability,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.availability)}>
          {row.availability}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <Container className="bg-white p-4 rounded">
        {pageLoading && (
          <Placeholder animation="glow">
            <Placeholder
              className="w-100 mb-3"
              style={{ borderRadius: 5, height: 40 }}
              bg="secondary"
            />
          </Placeholder>
        )}
        {!pageLoading && (
          <Form.Control
            type="text"
            placeholder="Search a product"
            className="mb-3"
            onChange={handleSearchInput}
          />
        )}
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
        )}
      </Container>
    </>
  );
}
