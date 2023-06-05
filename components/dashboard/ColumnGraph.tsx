import Placeholder from "react-bootstrap/Placeholder";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ColumnChart from "@/components/charts/ColumnChart";

export default function ColumnGraph({
  monthlyRevenue,
  earnings,
  numberOfUser,
  loading,
}: {
  monthlyRevenue: number[];
  earnings: string;
  numberOfUser: string;
  loading: boolean;
}) {
  return (
    <>
      <Row md={2} className="align-items-center">
        <Col md={4}>
          <Stack gap={3}>
            <div>
              <h1 className="fs-4 lh-1 text-primary my-2">
                {loading && (
                  <Placeholder as="p" animation="glow">
                    <Placeholder
                      xs={7}
                      style={{ borderRadius: 5 }}
                      bg="primary"
                    />
                  </Placeholder>
                )}
                {!loading && <strong>Dashboard</strong>}
              </h1>
              <p className="fs-5 text-secondary lh-1">
                {loading && (
                  <Placeholder as="p" animation="glow">
                    <Placeholder
                      xs={10}
                      style={{ borderRadius: 5 }}
                      bg="dark"
                    />
                  </Placeholder>
                )}
                {!loading && "Overview of current month"}
              </p>
            </div>
            <div>
              <p className="fs-4 lh-11 text-primary my-2">
                {loading && (
                  <Placeholder as="p" animation="glow">
                    <Placeholder
                      xs={7}
                      style={{ borderRadius: 5 }}
                      bg="primary"
                    />
                  </Placeholder>
                )}
                {!loading && <strong>Todays earnings</strong>}
              </p>
              <p className="fs-5 text-secondary lh-1">
                {loading && (
                  <Placeholder as="p" animation="glow">
                    <Placeholder
                      xs={10}
                      style={{ borderRadius: 5 }}
                      bg="dark"
                    />
                  </Placeholder>
                )}
                {!loading && `Php ${earnings}`}
              </p>
            </div>
            <div>
              <p className="fs-4 lh-11 text-primary my-2">
                {loading && (
                  <Placeholder as="p" animation="glow">
                    <Placeholder
                      xs={7}
                      style={{ borderRadius: 5 }}
                      bg="primary"
                    />
                  </Placeholder>
                )}
                {!loading && <strong>Number of users</strong>}
              </p>
              <p className="fs-5 text-secondary lh-1">
                {loading && (
                  <Placeholder as="p" animation="glow">
                    <Placeholder
                      xs={10}
                      style={{ borderRadius: 5 }}
                      bg="dark"
                    />
                  </Placeholder>
                )}
                {!loading && numberOfUser}
              </p>
            </div>
          </Stack>
        </Col>
        <Col md={8}>
          {loading && (
            <Placeholder as="p" animation="glow">
              <Placeholder
                className="w-100"
                style={{ borderRadius: 5, height: 420, background: "#F9B15D" }}
              />
            </Placeholder>
          )}
          {!loading && (
            <ColumnChart data={monthlyRevenue} height="420" width="100%" />
          )}
        </Col>
      </Row>
    </>
  );
}
