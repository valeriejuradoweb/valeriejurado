import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import MobileLogo from "@/components/MobileLogo";
import NavLink from "./NavLink";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <>
      <Link
        href="/"
        className="fixed m-auto top-7 w-14 h-10 left-0 right-0 mix-blend-normal z-50"
      >
        <MobileLogo />
      </Link>

      <Bounded
        as="header"
        className="fixed top-0 z-50 w-full mix-blend-difference"
      >
        <div className="">
          <div className="gap-4">
            <nav className="mix-blend-difference">
              <ul className="flex justify-between text-white">
                {settings.data.navigation.map(({ link, label }) => (
                  <li key={label}>
                    <NavLink field={link} className="p-3">
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/"
              className="fixed m-auto top-7 w-14 h-10 left-0 right-0 mix-blend-normal z-50"
            ></Link>
          </div>
        </div>
      </Bounded>
    </>
  );
}
