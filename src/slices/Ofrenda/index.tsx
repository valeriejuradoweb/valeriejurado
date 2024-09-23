import { Content } from "@prismicio/client";
import * as prismic from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import TitleLink from "@/components/TitleLink";

/**
 * Props for `Ofrenda`.
 */
export type OfrendaProps = SliceComponentProps<Content.OfrendaSlice>;

/**
 * Component for "Ofrenda" Slices.
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
const Ofrenda = ({ slice }: OfrendaProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="grid md:grid-cols-3 mb-5 md:mb-20">
          <div className="flex order-1 mt-5 md:order-none">
            <div className="space-y-2 self-end">
              <TitleLink field={slice.primary.title_link}>
                {slice.primary.title_label}
              </TitleLink>
              <PrismicRichText
                field={slice.primary.project_description}
                components={components}
              />
              <div className="flex">
                <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
                <Button
                  field={slice.primary.button_link}
                  className="mb-4 md:md-10"
                >
                  {slice.primary.button_text}
                </Button>
              </div>
            </div>
          </div>
          <div className="order-0 md:order-none">
            <PrismicNextImage field={slice.primary.image_1} />
          </div>
          <div></div>
        </div>
        <div className="relative flex-none z-20 h-72 w-[100%] md:flex md:h-none md:space-x-10 md:w-[85%] ">
          <div className="relative -left-10 w-72 md:left-0 md:w-[45%] md:h-auto">
            <PrismicNextImage field={slice.primary.image_2} />
          </div>
          <div className="absolute -right-10 w-72 top-40 md:relative md:right-0 md:top-0 md:w-[45%] md:h-auto">
            <PrismicNextImage field={slice.primary.image_3} />
          </div>
        </div>
      </Bounded>
      <div className="relative md:w-[100%] md:-top-20">
        <div className="z-10 relative md:-top-20 md:w-[100%] md:h-auto">
          <PrismicNextImage field={slice.primary.image_4} />
        </div>
      </div>
    </section>
  );
};

export default Ofrenda;
