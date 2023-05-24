import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TopDonuts() {
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/products/top_donuts`
      );
      setData(response.data.data);
    };

    fetchData();
  }, [setData]);

  return (
    <>
      <Container
        className="bg-white rounded"
        style={{
          width: 380,
          height: 700,
          overflowY: "scroll",
          position: "relative",
        }}
      >
        <div
          className="bg-white pt-4 pb-2 px-2"
          style={{
            position: "sticky",
            top: 0,
            borderBottom: "1px solid #C6C6C6",
          }}
        >
          <p className="fs-5 lh-1 my-2">
            <strong>Top 10 Donuts</strong>
          </p>
          <p className="fs-6 lh-1 my-2 text-secondary">
            Best selling donut of all time
          </p>
        </div>
        <div className="mt-3">
          {data.map((donut, index) => (
            <Row key={donut["id"]} className="align-items-center mb-3">
              <Col xs={2}>
                <span
                  className="badge rounded fs-6"
                  style={{ backgroundColor: "#F9B15D" }}
                >
                  {index + 1}
                </span>
              </Col>
              <Col xs={3}>
                <Image
                  src={`/donuts/${donut["image"]}`}
                  height={80}
                  width={80}
                  alt="Top 10 donuts"
                ></Image>
              </Col>
              <Col>
                <p className="lh-1 my-2 fs-5">
                  <strong>{donut["name"]}</strong>
                </p>
                <p className="lh-1 my-2 fs-6 text-secondary">
                  Price: {donut["price"]} Php
                </p>
              </Col>
            </Row>
          ))}
        </div>
      </Container>
    </>
  );
}
