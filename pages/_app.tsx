import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Navbar from "@/components/global/Navbar";
import Container from "react-bootstrap/Container";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import "@/public/css/global.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/sweetrounds_icon.png" />
        <meta
          name="description"
          content="Indulge in the heavenly delight of freshly baked donuts at Sweet Rounds. Our wide range of flavors and handcrafted treats are sure to satisfy your sweet cravings. Visit us today and experience the joy of the perfect round."
        />
        <meta
          name="keywords"
          content="donuts, sweet rounds, bakery, desserts, treats"
        />
        <meta
          name="author"
          content="Bernard Sapida, Shania Gwyneth Nuga, Ralph Howard Azarcon"
        />
        <meta property="og:title" content="Sweet Rounds" />
        <meta property="og:url" content="https://sweetrounds-pos.vercel.app/" />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/3628508/pexels-photo-3628508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Head>
      <main>
        <NextNProgress
          color="linear-gradient(to right, orange, red)"
          options={{ showSpinner: false }}
        />
        <Navbar />
        <Container className="my-5">
          <Component {...pageProps} />
        </Container>
      </main>
    </SessionProvider>
  );
}
