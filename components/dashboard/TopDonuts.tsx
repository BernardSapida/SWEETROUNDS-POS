import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Image from "next/image";

export default function TopDonuts({
  donuts,
  loading,
}: {
  donuts: Record<string, any>[];
  loading: boolean;
}) {
  return (
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
          {loading && (
            <Placeholder animation="glow">
              <Placeholder xs={10} style={{ borderRadius: 5 }} bg="dark" />
            </Placeholder>
          )}
          {!loading && <strong>Top 10 Donuts</strong>}
        </p>

        <p className="fs-6 lh-1 my-2 text-secondary">
          {loading && (
            <Placeholder animation="glow">
              <Placeholder xs={8} style={{ borderRadius: 5 }} bg="secondary" />
            </Placeholder>
          )}
          {!loading && "Best selling donut of all time"}
        </p>
      </div>
      <div className="mt-3">
        {donuts.map((donut, index) => (
          <Row key={donut["id"]} className="align-items-center mb-3">
            <Col xs={2}>
              {loading && (
                <Placeholder animation="glow">
                  <Placeholder
                    style={{
                      borderRadius: 5,
                      height: 25,
                      width: 30,
                      backgroundColor: "#F9B15D",
                    }}
                  />
                </Placeholder>
              )}
              {!loading && (
                <span
                  className="badge rounded fs-6"
                  style={{ backgroundColor: "#F9B15D" }}
                >
                  {index + 1}
                </span>
              )}
            </Col>
            <Col xs={3}>
              {loading && (
                <Placeholder animation="glow">
                  <Placeholder
                    style={{
                      borderRadius: 40,
                      height: 80,
                      width: 80,
                      backgroundColor: "#F9B15D",
                    }}
                  />
                </Placeholder>
              )}
              {!loading && (
                <Image
                  src={`/donuts/${donut["image"]}`}
                  height={80}
                  width={80}
                  alt="Top 10 donuts"
                ></Image>
              )}
            </Col>
            <Col>
              <p className="lh-1 my-2 fs-5">
                {loading && (
                  <Placeholder animation="glow">
                    <Placeholder xs={7} style={{ borderRadius: 5 }} bg="dark" />
                  </Placeholder>
                )}
                {!loading && <strong>{donut["name"]}</strong>}
              </p>
              <p className="lh-1 my-2 fs-6 text-secondary">
                {loading && (
                  <Placeholder animation="glow">
                    <Placeholder
                      xs={10}
                      style={{ borderRadius: 5 }}
                      bg="secondary"
                    />
                  </Placeholder>
                )}
                {!loading && `Price: ${donut["price"]} Php`}
              </p>
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
}
