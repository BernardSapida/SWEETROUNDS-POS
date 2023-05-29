import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ColumnChart from "@/components/charts/ColumnChart";

import { ColumnData } from "@/Types/Dashboard";

export default function ColumnGraph({
  monthlyRevenue,
  earnings,
  numberOfUser,
}: {
  monthlyRevenue: number[];
  earnings: string;
  numberOfUser: string;
}) {
  return (
    <>
      <Row md={2} className="align-items-center">
        <Col md={4}>
          <Stack gap={3}>
            <div>
              <h1 className="fs-4 lh-1 text-primary my-2">
                <strong>Dashboard</strong>
              </h1>
              <p className="fs-5 text-secondary lh-1">
                Overview of current month
              </p>
            </div>
            <div>
              <p className="fs-4 lh-11 text-primary my-2">
                <strong>Todays earnings</strong>
              </p>
              <p className="fs-5 text-secondary lh-1">Php {earnings}</p>
            </div>
            <div>
              <p className="fs-4 lh-11 text-primary my-2">
                <strong>Number of users</strong>
              </p>
              <p className="fs-5 text-secondary lh-1">{numberOfUser}</p>
            </div>
          </Stack>
        </Col>
        <Col md={8}>
          <ColumnChart data={monthlyRevenue} height="420" width="100%" />
        </Col>
      </Row>
    </>
  );
}
