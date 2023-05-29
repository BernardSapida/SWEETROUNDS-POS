import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "@/components/setting/Form";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import { readSetting } from "@/helpers/Settings/Methods";
import { Setting } from "@/Types/Setting";

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
  user: Record<string, any>;
  setting: Setting;
}) {
  return (
    <Container className="bg-white p-4 rounded">
      <p className="fs-5 lh-1 my-1">
        <strong>Shop Setting</strong>
      </p>
      <Row className="mb-3 mt-4">
        <Col>
          <h3>You can modify the following:</h3>
          <p>
            <strong>• Tax management</strong>
          </p>
          <p>
            <strong>• Accepting orders</strong>
          </p>
        </Col>
        <Col>
          <Form userRole={user.role} setting={setting} />
        </Col>
      </Row>
    </Container>
  );
}
