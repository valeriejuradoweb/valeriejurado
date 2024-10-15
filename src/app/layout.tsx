import type { Metadata } from "next";
import "./globals.css";
import "./safari.css";
import clsx from "clsx";
import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";

import Header from "@/components/Header";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import Footer from "@/components/Footer";

const redhatdisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
  display: "swap",
  adjustFontFallback: false,
});

const redhattext = Red_Hat_Text({
  subsets: ["latin"],
  variable: "--font-red-hat-text",
  display: "swap",
  adjustFontFallback: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Valerie Jurado Botanical Design",
    description:
      settings.data.meta_description ||
      "Valerie Jurado is an LA-based botanical designer. She creates bespoke floral expressions for galleries, businesses and large events.",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(redhatdisplay.variable, redhattext.variable)}
    >
      {/*<!-- Preconnect to Prismic raster image CDN (png, jpg, etc.) -->*/}
      <link
        rel="preconnect"
        href="https://images.prismic.io"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://images.prismic.io" />

      {/*<!-- Preconnect to Prismic other assets CDN (svg, pdf, mp3, etc.) -->*/}
      <link
        rel="preconnect"
        href="https://prismic-io.s3.amazonaws.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://prismic-io.s3.amazonaws.com" />
      <body>
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
