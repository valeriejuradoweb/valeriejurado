// pages/_app.tsx
import Head from "next/head";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Test title</title>
        <link
          rel="preconnect"
          href="https://images.prismic.io"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.prismic.io" />
        <link
          rel="preconnect"
          href="https://prismic-io.s3.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://prismic-io.s3.amazonaws.com" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
