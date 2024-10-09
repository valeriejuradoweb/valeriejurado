import Bounded from "@/components/Bounded";
import * as prismic from "@prismicio/client";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Button from "@/components/Button";
import TitleLink from "@/components/TitleLink";

/**
 * Props for `Orchids`.
 */
export type OrchidsProps = SliceComponentProps<Content.OrchidsSlice>;

/**
 * Component for "Orchids" Slices.
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
const Orchids = ({ slice }: OrchidsProps): JSX.Element => {
  const background_image = slice.primary.background_image;
  return (
    <section className="relative">
      {prismic.isFilled.image(background_image) && (
        <PrismicNextImage
          field={slice.primary.background_image}
          alt=""
          fill={true}
          className="hidden md:block pointer-events-none select-none object-cover -z-50"
        />
      )}
      {prismic.isFilled.image(background_image) && (
        <PrismicNextImage
          field={slice.primary.mobile_background_image}
          alt=""
          fill={true}
          className="block pointer-events-none select-none object-cover -z-50 md:hidden"
        />
      )}
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="text-[#DEDEDE] grid grid-rows-2 h-[1200px] md:h-[1800px]">
          <div className="relative self-end space-y-2 -bottom-32 md:bottom-0">
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
          <div></div>
        </div>
      </Bounded>
    </section>
  );
};

export default Orchids;
