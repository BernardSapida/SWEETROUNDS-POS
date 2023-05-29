import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useEffect, useState } from "react";
import { numberFormat } from "@/helpers/format";

import ColumnChart from "@/components/charts/ColumnChart";

import {
  fetchOnlineMonthlyRevenue,
  fetchWalkinMonthlyRevenue,
  fetchOnlineRevenueByDay,
  fetchWalkinRevenueByDay,
  fetchUserList,
} from "@/helpers/Chart/Methods";

type ColumnData = {
  name: string;
  data: Array<number>;
};

export default function ColumnGraph(props: any) {
  const [columnData, setColumnData] = useState<Array<ColumnData>>([
    {
      name: "Monthly Earnings",
      data: Array.from({ length: 12 }, () => 0),
    },
  ]);
  const [earnings, setEarnings] = useState("0");
  const [users, setUsers] = useState("0");

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const onlineResponse = await fetchOnlineMonthlyRevenue();
      const walkinResponse = await fetchWalkinMonthlyRevenue();
      const arr = Array.from({ length: 12 }, () => 0);

      onlineResponse.data.map(
        (obj: Record<string, any>, index: number) =>
          (arr[index] += +obj.revenue)
      );

      walkinResponse.data.map(
        (obj: Record<string, any>, index: number) =>
          (arr[index] += +obj.revenue)
      );

      setColumnData([
        {
          name: "Monthly Earnings",
          data: arr,
        },
      ]);
    };

    const fetchEarnings = async () => {
      const responseOnline = await fetchOnlineRevenueByDay();
      const responseWalkin = await fetchWalkinRevenueByDay();
      const onlineRevenue = +responseOnline.revenue;
      const walkinsRevenue = +responseWalkin.revenue;

      setEarnings(numberFormat(onlineRevenue + walkinsRevenue));
    };

    const fetchUsers = async () => {
      const response = await fetchUserList();
      setUsers(numberFormat(response.data.length));
    };

    fetchMonthlyRevenue();
    fetchEarnings();
    fetchUsers();
  }, []);

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
              <p className="fs-5 text-secondary lh-1">{users}</p>
            </div>
          </Stack>
        </Col>
        <Col md={8}>
          <ColumnChart data={columnData} height="420" width="100%" />
        </Col>
      </Row>
    </>
  );
}
