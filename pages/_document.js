import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Comforter+Brush&family=Fira+Sans:wght@200;300&family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap"
          />
          <link rel="manifest" href="/manifest.json"></link>
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#000000"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
