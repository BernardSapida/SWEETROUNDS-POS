import Container from "react-bootstrap/Container";
import Table from "@/components/products/Table";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
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

    return {
      props: {
        user: session.user,
        NEXT_SERVER_URL: process.env.NEXT_SERVER_URL,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Products({ user, NEXT_SERVER_URL }: { user: User, NEXT_SERVER_URL: any }) {
  console.log(NEXT_SERVER_URL)
  return (
    <>
      <Container>
        <Table userRole={user.role} />
      </Container>
    </>
  );
}
