import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { Jost } from "next/font/google";
import { createClient } from "@/prismicio";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

/* IF YOU NEED A SECOND FONT, PUT IT HERE:
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
}) */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "Valerie Jurado Botanical Design",
    description:
      page.data.meta_description ||
      "Valerie Jurado is an LA-based botanical designer. She creates bespoke floral expressions for galleries, businesses and large events.",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(jost.variable, jost.variable)}>
      <body>
        <header>Header!</header>
        {children}
        <footer>Footer!</footer>
      </body>
    </html>
  );
}
