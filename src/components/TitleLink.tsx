import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function TitleLink({
  className,
  prefetch = true, // Default value
  ...restProps
}: PrismicNextLinkProps) {
  // Ensure 'prefetch' is a boolean before passing
  return (
    <PrismicNextLink
      className={`text-lg tracking-wide underline underline-offset-4 font-display font-medium md:text-2xl ${className}`}
      prefetch={typeof prefetch === "boolean" ? prefetch : true} // Ensure it’s a boolean
      {...restProps} // Spread the rest of the props
    />
  );
}
