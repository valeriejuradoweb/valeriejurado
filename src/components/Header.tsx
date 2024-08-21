import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import MobileLogo from "@/components/MobileLogo";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <Bounded as="header" className="fixed top-0 z-10 w-full">
      <Link href="/">
        <div className="absolute m-auto w-14 h-auto left-0 right-0 border md:">
          <MobileLogo />
        </div>
      </Link>

      <div className="gap-4">
        <nav>
          <ul className="flex justify-between border">
            {settings.data.navigation.map(({ link, label }) => (
              <li key={label}>
                <PrismicNextLink
                  field={link}
                  className="p-3 font-normal text-3xl tracking-wide underline underline-offset-8 font-body"
                >
                  {label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
