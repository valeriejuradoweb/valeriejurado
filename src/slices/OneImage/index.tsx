import { Content } from "@prismicio/client";
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for one_image (variation: {slice.variation}) Slices
    </section>
  );
};

export default OneImage;
