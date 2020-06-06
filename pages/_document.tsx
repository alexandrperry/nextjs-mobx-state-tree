import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext
} from 'next/document';

export default class extends Document<DocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          />
          <link rel="icon" href="/static/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/static/favicon.ico" />
          <link
            rel="preload"
            as="font"
            href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap"
          />
        </Head>
        <body className="preload">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
