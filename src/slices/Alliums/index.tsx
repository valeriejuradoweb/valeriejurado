import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import TitleLink from "@/components/TitleLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Alliums`.
 */
export type AlliumsProps = SliceComponentProps<Content.AlliumsSlice>;

/**
 * Component for "Alliums" Slices.
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
    <p className="text-base leading-7 font-light font-body md:max-w-[300px] md:text-xl md:leading-8">
      {children}
    </p>
  ),
};
const Alliums = ({ slice }: AlliumsProps): JSX.Element => {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute flex w-full z-30 pt-10 pr-32 justify-end">
        <div className="text-white space-y-2">
          <TitleLink field={slice.primary.title_link}>
            {slice.primary.title_label}
          </TitleLink>
          <PrismicRichText
            field={slice.primary.project_description}
            components={components}
          />
          <div className="flex">
            <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
            <Button field={slice.primary.button_link} className="mb-4 md:md-10">
              {slice.primary.button_text}
            </Button>
          </div>
        </div>
      </div>

      <PrismicNextImage
        className="w-[100%] z-10 -mb-96"
        field={slice.primary.image_1}
      />
      <Bounded>
        <div className="items-end relative flex w-full z-30 justify-between gap-14">
          <div>
            <PrismicNextImage className="" field={slice.primary.image_2} />
          </div>
          <div>
            <PrismicNextImage className="" field={slice.primary.image_3} />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Alliums;
