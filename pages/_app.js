// pages/_app.js
import App, { Container } from 'next/app'
import React from 'react'
// here we are importing Next's custom component
// for managing the <head>
import Head from 'next/head'
// We will create this object shortly
import { DEFAULT_SEO } from '../config'
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
        <title>Test title</title>
        {/*<!-- Preconnect to Prismic raster image CDN (png, jpg, etc.) -->*/}
<link rel="preconnect" href="https://images.prismic.io" crossorigin />
<link rel="dns-prefetch" href="https://images.prismic.io" />

{/*<!-- Preconnect to Prismic other assets CDN (svg, pdf, mp3, etc.) -->*/}
<link rel="preconnect" href="https://prismic-io.s3.amazonaws.com" crossorigin />
<link rel="dns-prefetch" href="https://prismic-io.s3.amazonaws.com" />
      </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}

