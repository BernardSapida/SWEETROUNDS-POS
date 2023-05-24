import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "@/components/cashier/Table";
import BillRecord from "@/components/cashier/BillRecord";
import Receipt from "@/components/cashier/Receipt";
import styles from "./index.module.css";

import { useState, useEffect, useRef } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import {
  fetchSetting,
  processOrder,
  updateOrder,
  reduceOrder,
} from "@/helpers/cashier";

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

    return {
      props: { user: session.user },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Dashboard({ user }: { user: Record<string, any> }) {
  const [order, setOrder] = useState<Record<string, any>>({});
  const [setting, setSetting] = useState<Record<string, any>>({});
  let subTotal = useRef(0);
  let donutQuantity = useRef(0);
  let invoiceId = useRef("");

  useEffect(() => {
    processOrder(order, subTotal, donutQuantity, invoiceId);
    fetchSetting(setSetting);
  }, [order]);

  const reduce = (id: string | number) => {
    reduceOrder(id, order, setOrder);
  };

  const update = (item: Record<string, any>) => {
    updateOrder(item, order, setOrder);
  };

  return (
    <>
      <div className={styles.container_transaction}>
        <Container className="bg-white p-4 rounded">
          <p className="fs-5 lh-1 my-1 mb-3">
            <strong>Cashier Transaction</strong>
          </p>
          <Row>
            <Col md={8} sm={12}>
              <Table updateOrder={update} reduceOrder={reduce} order={order} />
            </Col>
            <Col md={4} sm={12}>
              <BillRecord
                order={order}
                setOrder={setOrder}
                setting={setting}
                subTotal={subTotal}
                donutQuantity={donutQuantity}
                invoiceId={invoiceId.current}
                cashierName={`${user.employee_firstname}  ${user.employee_lastname}`}
                userRole={user.role}
                cashierId={user.id}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.receipt_invoice}>
        <Receipt
          order={order}
          setting={setting}
          subTotal={subTotal}
          invoiceId={invoiceId.current}
          cashierName={`${user.employee_firstname}  ${user.employee_lastname}`}
        />
      </div>
    </>
  );
}
