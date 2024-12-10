import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import NavLink from "./NavLink";
import LogoGoldLg from "@/components/LogoGoldLg";
import LogoGoldSm from "@/components/LogoGoldSm";
/*mix-blend-exclusion*/
export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <>
      <Link
        href="/"
        className="fixed m-auto top-7 w-14 h-10 left-0 right-0 z-50 md:w-[410px]"
      >
        <div className="block md:hidden">
          <LogoGoldSm />
        </div>
        <div className="hidden md:block">
          <LogoGoldLg />
        </div>
      </Link>
      <div className="fixed m-auto top-7 w-14 h-10 left-0 right-0 z-40 md:w-[410px] bg-[#121212]/80 blur-xl mix-blend-color-burn safari-blend mobile-blend"></div>

      <Bounded
        as="header"
        className="fixed top-0 z-50 w-full mix-blend-difference py-8"
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
              className="fixed m-auto top-7 w-14 h-10 left-0 right-0 mix-blend-normal z-50 md:w-96"
            ></Link>
          </div>
        </div>
      </Bounded>
    </>
  );
}
