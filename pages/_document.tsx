import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          backgroundColor: "#F6F9FA",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
