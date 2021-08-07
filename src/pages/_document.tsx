import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* <link rel="apple-touch-icon" href="/icon.png"></link> */}
          {/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand&family=Rubik:wght@500&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
