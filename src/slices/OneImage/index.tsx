import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `OneImage`.
 */
export type OneImageProps = SliceComponentProps<Content.OneImageSlice>;

/**
 * Component for "OneImage" Slices.
 */
const OneImage = ({ slice }: OneImageProps): JSX.Element => {
  return (
    <section className="bg-white overflow-hidden py-4 md:py-8">
      <PrismicNextImage field={slice.primary.image_1} />
    </section>
  );
};

export default OneImage;
