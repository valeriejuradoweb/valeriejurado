import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "block w-fit hover:opacity-75 transition-opacity duration-200 ease-in-outtracking-wider text-base tracking-wide underline underline-offset-4 font-display font-medium md:text-xl",
        className
      )}
      {...restProps}
    />
  );
}
