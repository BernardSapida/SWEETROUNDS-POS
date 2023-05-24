import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "@/components/dashboard/Card";

import { getLastDayOfMonth, getCurrentMonth } from "@/helpers/date";
import { useEffect, useState } from "react";
import axios from "axios";

import { getMonth, getYear } from "@/helpers/date";
import { numberFormat } from "@/helpers/format";

function Cards() {
  const [revenue, setRevenue] = useState("0");
  const [customer, setCustomer] = useState("0");
  const [productSold, setProductSold] = useState("0");
  const [transaction, setTransaction] = useState("0");

  useEffect(() => {
    const fetchRevenue = async () => {
      const responseOnline = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/online/month`,
        {
          year: getYear(),
          month: getMonth(),
        }
      );

      const responseWalkin = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/revenue/walkin/month`,
        {
          year: getYear(),
          month: getMonth(),
        }
      );

      const onlineRevenue = +responseOnline.data.revenue;
      const walkinsRevenue = +responseWalkin.data.revenue;

      setRevenue(numberFormat(onlineRevenue + walkinsRevenue));
    };

    const fetchCustomer = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/customers/new`
      );

      setCustomer(numberFormat(response.data.data.length));
    };

    const fetchProductSold = async () => {
      const responseOnline = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/sold/online/month`,
        {
          year: getYear(),
          month: getMonth(),
        }
      );

      const responseWalkin = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/donut/sold/walkin/month`,
        {
          year: getYear(),
          month: getMonth(),
        }
      );

      setProductSold(
        numberFormat(
          +responseOnline.data.total_sold + +responseWalkin.data.total_sold
        )
      );
    };

    const fetchTransaction = async () => {
      const responseOnline = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/online/number_of_transaction/month`,
        {
          year: getYear(),
          month: getMonth(),
        }
      );

      const responseWalkin = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/reports/transaction/walkin/number_of_transaction/month`,
        {
          year: getYear(),
          month: getMonth(),
        }
      );

      const onlineTransaction = responseOnline.data.completed_transaction;
      const walkinTransaction = responseWalkin.data.completed_transaction;

      setTransaction(numberFormat(onlineTransaction + walkinTransaction));
    };

    fetchRevenue();
    fetchCustomer();
    fetchProductSold();
    fetchTransaction();
  }, []);

  return (
    <Row className="justify-content-center align-items-center gap-2 flex-wrap mt-4">
      <Col>
        <Card
          title="Revenue Status"
          value={`Php ${revenue}`}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#EB4985"
        />
      </Col>
      <Col>
        <Card
          title="New Customers"
          value={customer}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#6E54BC"
        />
      </Col>
      <Col>
        <Card
          title="Product Sold"
          value={productSold}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#58A7E5"
        />
      </Col>
      <Col>
        <Card
          title="Completed Transaction"
          value={transaction}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#F9B15D"
        />
      </Col>
    </Row>
  );
}

export default Cards;
