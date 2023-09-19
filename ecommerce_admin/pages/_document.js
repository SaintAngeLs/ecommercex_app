import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Eccommerce Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> 
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
