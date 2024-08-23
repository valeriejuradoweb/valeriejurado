import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import MobileLogo from "@/components/MobileLogo";
import TitleLink from "@/components/TitleLink";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <Bounded
      as="header"
      className="fixed top-0 z-10 w-full mix-blend-difference"
    >
      <Link
        href="/"
        className="fixed m-auto top-7 w-14 h-10 left-0 right-0 mix-blend-normal"
      >
        <MobileLogo />
      </Link>

      <div className="">
        <div className="gap-4">
          <nav className="mix-blend-difference">
            <ul className="flex justify-between text-white">
              {settings.data.navigation.map(({ link, label }) => (
                <li key={label}>
                  <TitleLink field={link} className="p-3">
                    {label}
                  </TitleLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Bounded>
  );
}
