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
 * Props for `Pinata`.
 */
export type PinataProps = SliceComponentProps<Content.PinataSlice>;

/**
 * Component for "Pinata" Slices.
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
const Pinata = ({ slice }: PinataProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded className=" -mb-5 md:mb-none">
        <div className="md:flex md:gap-14">
          <div className="mb-4 md:w-[60%] md:-mb-40">
            <PrismicNextImage field={slice.primary.image_1} />
          </div>
          <div className="space-y-2 place-self-end md:mb-56">
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
      </Bounded>

      <div className="flex gap-4 mb-4 md:w-[70%]">
        <div>
          <PrismicNextImage field={slice.primary.image_2} />
        </div>
        <div>
          <PrismicNextImage field={slice.primary.image_3} />
        </div>
      </div>
      <div className="float-right flex gap-4 mb-10 md:w-[70%]">
        <div>
          <PrismicNextImage field={slice.primary.image_4} />
        </div>
        <div>
          <PrismicNextImage field={slice.primary.image_5} />
        </div>
      </div>
    </section>
  );
};

export default Pinata;
