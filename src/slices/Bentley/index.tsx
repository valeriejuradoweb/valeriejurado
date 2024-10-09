import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Bentley`.
 */
export type BentleyProps = SliceComponentProps<Content.BentleySlice>;

/**
 * Component for "Bentley" Slices.
 */
const Bentley = ({ slice }: BentleyProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for bentley (variation: {slice.variation}) Slices
    </section>
  );
};

export default Bentley;
