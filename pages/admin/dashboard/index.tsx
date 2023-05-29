import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import dynamic from "next/dynamic";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

const ColumnGraph = dynamic(
  () => import("@/components/dashboard/ColumnGraph"),
  { ssr: false }
);
const DonutGraph = dynamic(() => import("@/components/dashboard/DonutGraph"), {
  ssr: false,
});
const OrderTable = dynamic(() => import("@/components/dashboard/OrderTable"), {
  ssr: false,
});
import TopDonuts from "@/components/dashboard/TopDonuts";
import Cards from "@/components/dashboard/Cards";
import { getSession } from "next-auth/react";

import {
  fetchWalkinTransaction,
  fetchOnlineTransaction,
} from "@/helpers/Chart/Methods";
import {
  fetchCustomer,
  fetchEarnings,
  fetchMonthlyRevenue,
  fetchProductSold,
  fetchRevenue,
  fetchTransaction,
  fetchUsers,
} from "@/helpers/Dashboard/Methods";

import { ColumnData } from "@/Types/Dashboard";
import { fetchTop10Donuts } from "@/helpers/SalesReport/Methods";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req } = context;
    const session = await getSession({ req: req });

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    // Column Data
    const monthlyRevenue: ColumnData[] = await fetchMonthlyRevenue();
    const earnings = await fetchEarnings();
    const numberOfUsers = await fetchUsers();

    // Cards Data
    const revenue = await fetchRevenue();
    const numberOfCustomer = await fetchCustomer();
    const productSold = await fetchProductSold();
    const numberOfTransaction = await fetchTransaction();

    // Donut Data
    const onlineTransaction = await fetchOnlineTransaction();
    const walkinTransaction = await fetchWalkinTransaction();
    const donutData = [
      onlineTransaction.number_of_transaction,
      walkinTransaction.number_of_transaction,
    ];

    // Top 10 donuts
    const donuts = await fetchTop10Donuts();

    return {
      props: {
        monthlyRevenue,
        earnings,
        numberOfUsers,
        revenue,
        numberOfCustomer,
        productSold,
        numberOfTransaction,
        donutData,
        donuts,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Error",
      },
    };
  }
};

export default function Dashboard({
  monthlyRevenue,
  earnings,
  numberOfUsers,
  revenue,
  numberOfCustomer,
  productSold,
  numberOfTransaction,
  donutData,
  donuts,
}: {
  monthlyRevenue: number[];
  earnings: string;
  numberOfUsers: string;
  revenue: string;
  numberOfCustomer: string;
  productSold: string;
  numberOfTransaction: string;
  donutData: Array<number>;
  donuts: Record<string, any>[];
}) {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={8} sm={12} className="bg-white rounded p-4">
          <ColumnGraph
            monthlyRevenue={monthlyRevenue}
            earnings={earnings}
            numberOfUser={numberOfUsers}
          />
        </Col>
        <Col md={4} sm={12} className="bg-white rounded p-4">
          <DonutGraph series={donutData} />
        </Col>
      </Row>
      <Cards
        revenue={revenue}
        numberOfCustomer={numberOfCustomer}
        productSold={productSold}
        numberOfTransaction={numberOfTransaction}
      />
      <Row className="justify-content-center mt-4 gap-4">
        <Col sm={12} md={4}>
          <TopDonuts donuts={donuts} />
        </Col>
        <Col sm={12} md={7}>
          <OrderTable />
        </Col>
      </Row>
    </>
  );
}
