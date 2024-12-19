import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function TitleLink({
  className,
  prefetch = true, // Default value <- known issue with prismic that I put in manually
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className="text-xl tracking-wide underline underline-offset-8 decoration-1 font-display font-thin hover:opacity-75 transition-opacity duration-200 ease-in-out md:text-3xl"
      {...restProps}
    />
  );
}
