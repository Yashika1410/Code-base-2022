import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Barlow+Condensed&display=optional"
          rel="stylesheet"
          type="text/css"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
