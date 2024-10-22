import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `UtaWeeklyDark`.
 */
export type UtaWeeklyDarkProps =
  SliceComponentProps<Content.UtaWeeklyDarkSlice>;

/**
 * Component for "UtaWeeklyDark" Slices.
 */
const UtaWeeklyDark = ({ slice }: UtaWeeklyDarkProps): JSX.Element => {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <PrismicNextImage field={slice.primary.image_1} />
        <PrismicNextImage field={slice.primary.image_2} />
      </div>
    </section>
  );
};

export default UtaWeeklyDark;
