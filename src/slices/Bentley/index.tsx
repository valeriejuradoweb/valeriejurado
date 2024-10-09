import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import TitleLink from "@/components/TitleLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Bentley`.
 */
export type BentleyProps = SliceComponentProps<Content.BentleySlice>;

/**
 * Component for "Bentley" Slices.
 */
const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="sm"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0"
    >
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base leading-7 font-light font-body md:max-w-[22rem] md:text-xl md:leading-8">
      {children}
    </p>
  ),
};
const Bentley = ({ slice }: BentleyProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded className="">
        <div className="grid grid-cols-1 py-8 place-items-center gap-8 md:gap-0 md:py-24 md:grid-cols-2">
          <div>
            <PrismicNextImage field={slice.primary.image_1} />
          </div>
          <div className="space-y-2">
            <TitleLink field={slice.primary.title_link}>
              {slice.primary.title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.description}
              components={components}
            />
            <div className="flex">
              <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
              <Button
                field={slice.primary.button_link}
                className="mb-4 md:md-10"
              >
                {slice.primary.button_label}
              </Button>
            </div>
          </div>
        </div>
      </Bounded>
      <PrismicNextImage field={slice.primary.image_2} />
    </section>
  );
};

export default Bentley;
