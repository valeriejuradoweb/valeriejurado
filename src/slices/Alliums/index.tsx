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
      <div className="absolute flex w-full z-30 pt-10 justify-end pr-10 md:pr-32">
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
        className="z-10  w-[120%] md:w-[100%] hidden md:block md:-mb-96"
        field={slice.primary.image_1}
      />
      <PrismicNextImage
        className="z-10  w-[140%] block md:hidden"
        field={slice.primary.image_3}
      />
      <Bounded>
        <div className="items-end relative w-full z-30 justify-between gap-14 hidden md:flex">
          <div>
            <PrismicNextImage className="" field={slice.primary.image_2} />
          </div>
          <div>
            <PrismicNextImage className="" field={slice.primary.image_3} />
          </div>
        </div>
        <div className="block mb-10 md:hidden">
          <PrismicNextImage className="" field={slice.primary.image_2} />
        </div>
        <div className="flex relative w-full gap-8 md:hidden">
          <div>
            <PrismicNextImage field={slice.primary.mobile_image_4} />
          </div>
          <div>
            <PrismicNextImage field={slice.primary.mobile_image_5} />
          </div>
        </div>
      </Bounded>
      <div>
        <PrismicNextImage
          className="w-[120%] md:w-[100%] block md:hidden"
          field={slice.primary.image_1}
        />
      </div>
    </section>
  );
};

export default Alliums;
