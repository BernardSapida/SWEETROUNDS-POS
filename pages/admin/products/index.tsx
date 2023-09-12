import Container from "react-bootstrap/Container";
import Table from "@/components/products/Table";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { User } from "@/types/User";
import { fetchTop10Donuts } from '@/helpers/SalesReport/Methods';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req } = context;
    const session = await getSession({ req: req });

    const donuts = await fetchTop10Donuts();

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    return {
      props: { user: session.user, donuts },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Products({ user, donuts }: { user: User, donuts: any }) {
  console.log(donuts)
  return (
    <>
      <Container>
        <Table userRole={user.role} />
      </Container>
    </>
  );
}
