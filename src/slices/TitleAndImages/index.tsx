import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TitleAndImages`.
 */
export type TitleAndImagesProps =
  SliceComponentProps<Content.TitleAndImagesSlice>;

/**
 * Component for "TitleAndImages" Slices.
 */
const TitleAndImages = ({ slice }: TitleAndImagesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for title_and_images (variation: {slice.variation})
      Slices
    </section>
  );
};

export default TitleAndImages;
