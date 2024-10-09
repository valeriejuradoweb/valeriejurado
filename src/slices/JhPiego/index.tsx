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
 * Props for `JhPiego`.
 */
export type JhPiegoProps = SliceComponentProps<Content.JhPiegoSlice>;
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
    <p className="text-base leading-7 font-thin font-body max-w-[16rem] md:max-w-[22rem] md:text-xl md:leading-9">
      {children}
    </p>
  ),
};

/**
 * Component for "JhPiego" Slices.
 */
const JhPiego = ({ slice }: JhPiegoProps): JSX.Element => {
  return (
    <section className="relative bg-black overflow-hidden">
      <PrismicNextImage
        className="z-10 block md:w-[100%] md:hidden"
        field={slice.primary.mobile_image_1}
      />
      <div className="w-full z-30 justify-center text-white pt-10 md:pt-14 flex px-7 md:absolute md:px-6">
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
            <Button field={slice.primary.button_link} className="mb-4 md:md-10">
              {slice.primary.button_text}
            </Button>
          </div>
        </div>
      </div>
      <PrismicNextImage
        className="z-10 block md:w-[100%] md:hidden"
        field={slice.primary.mobile_image_2}
      />
      <PrismicNextImage
        className="z-10 hidden md:w-[100%] md:block"
        field={slice.primary.image_1}
      />

      <Bounded className="text-white">
        <div></div>
      </Bounded>
    </section>
  );
};

export default JhPiego;
