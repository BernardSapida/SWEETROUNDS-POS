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

    const onlineTransaction = await fetchOnlineTransaction();
    const walkinTransaction = await fetchWalkinTransaction();
    const donutData = [
      onlineTransaction.number_of_transaction,
      walkinTransaction.number_of_transaction,
    ];

    return {
      props: {
        donutData,
        user: session.user,
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
  donutData,
  user,
}: {
  donutData: Array<number>;
  user: Record<string, any>;
}) {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={8} sm={12} className="bg-white rounded p-4">
          <ColumnGraph />
        </Col>
        <Col md={4} sm={12} className="bg-white rounded p-4">
          <DonutGraph series={donutData} />
        </Col>
      </Row>
      <Cards />
      <Row className="justify-content-center mt-4 gap-4">
        <Col sm={12} md={4}>
          <TopDonuts />
        </Col>
        <Col sm={12} md={7}>
          <OrderTable />
        </Col>
      </Row>
    </>
  );
}
