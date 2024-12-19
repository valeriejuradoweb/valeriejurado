import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
  className,
  prefetch = true, // Default value <- known issue with prismic that I put in manually
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "block w-fit hover:opacity-65 transition-opacity duration-200 ease-in-out text-base tracking-wide underline decoration-1 underline-offset-4 font-display md:text-xl",
        className
      )}
      {...restProps}
    />
  );
}
