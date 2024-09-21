import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <link rel="icon" href="/logo.png" />
        <title>MindTide</title>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
