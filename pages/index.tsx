import SignInForm from "@/components/signin/Form";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const session = await getSession({ req: req });

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/admin/dashboard",
      },
    };
  }

  return { props: {} };
};

export default function Home() {
  return (
    <>
      <SignInForm />
    </>
  );
}
