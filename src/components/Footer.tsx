import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <footer>
      <section className="relative text-white md:h-[20rem]">
        {prismic.isFilled.image(settings.data.footer_background_image) && (
          <PrismicNextImage
            field={settings.data.footer_background_image}
            alt=""
            fill={true}
            className="hidden pointer-events-none select-none object-cover -z-50 md:block"
          />
        )}

        <div className="text-center font-body">
          <Link href="/">{settings.data.site_title}</Link>

          <p>
            © {new Date().getFullYear()} {settings.data.site_title}
          </p>

          <ul>
            {settings.data.navigation.map(({ link, label }) => (
              <li key={label}>
                <PrismicNextLink field={link}>{label}</PrismicNextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
}
