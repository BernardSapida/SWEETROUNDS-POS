import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Form from "@/components/setting/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { readSetting } from "@/helpers/Settings/Methods";
import { Setting } from "@/types/Setting";
import { User } from "@/types/User";

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

    const response = await readSetting();

    return {
      props: { user: session.user, setting: response.data },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function ShopSetting({
  user,
  setting,
}: {
  user: User;
  setting: Setting;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <Container className="bg-white p-4 rounded">
      <p className="fs-5 lh-1 my-1">
        {loading && (
          <Placeholder animation="glow">
            <Placeholder
              xs={2}
              style={{ borderRadius: 5, height: 25 }}
              bg="dark"
            />
          </Placeholder>
        )}
        {!loading && <strong>Shop Setting</strong>}
      </p>
      <Row className="mb-3 mt-4">
        <Col md={6} sm={12}>
          {loading && (
            <Placeholder animation="glow">
              <Placeholder
                xs={6}
                style={{ borderRadius: 5, height: 25 }}
                bg="dark"
              />
            </Placeholder>
          )}
          {!loading && <h3>You can modify the following:</h3>}
          <p className="mt-3">
            {loading && (
              <Placeholder animation="glow">
                <Placeholder xs={3} style={{ borderRadius: 5 }} bg="dark" />
              </Placeholder>
            )}
            {!loading && <strong>Tax management:</strong>}
            {loading && (
              <Placeholder className="ms-2" animation="glow">
                <Placeholder
                  xs={8}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
                <Placeholder
                  xs={12}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
                <Placeholder
                  xs={12}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
                <Placeholder
                  xs={12}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!loading &&
              "Food order tax revenue is typically collected by the government to fund public services and infrastructure. It is important for consumers to be aware of the applicable tax rate when placing food orders to accurately budget their expenses."}
          </p>
          <p>
            {loading && (
              <Placeholder animation="glow">
                <Placeholder xs={3} style={{ borderRadius: 5 }} bg="dark" />
              </Placeholder>
            )}
            {!loading && <strong>Accepting orders:</strong>}
            {loading && (
              <Placeholder className="ms-2" animation="glow">
                <Placeholder
                  xs={8}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
                <Placeholder
                  xs={12}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
                <Placeholder
                  xs={12}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
                <Placeholder
                  xs={12}
                  style={{ borderRadius: 5 }}
                  bg="secondary"
                />
              </Placeholder>
            )}
            {!loading &&
              `The option to accept or not accept orders refers to the ability of
              the website to receive and process customer orders. If the system is
              set to 'Accepting Order', users can freely place their orders
              and proceed with the purchase. On the other hand, if the system is
              set to 'Not Accepting Order'
              customers will not be able to place orders through the website. This
              may occur when the business is temporarily closed, during
              maintenance or updates, or when the order volume exceeds the
              capacity of the establishment.`}
          </p>
        </Col>
        <Col md={6} sm={12}>
          <Form userRole={user.role!} setting={setting} pageLoading={loading} />
        </Col>
      </Row>
    </Container>
  );
}
