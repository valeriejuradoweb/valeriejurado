import { Content } from "@prismicio/client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";

import Arrow from "@/components/Arrow";
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="sm" className="mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base leading-7 font-light font-body mb-4 md:mb-8 md:max-w-md md:text-xl md:leading-10">
      {children}
    </p>
  ),
};

/**
 * Props for `DetailHeadingNext`.
 */
export type DetailHeadingNextProps =
  SliceComponentProps<Content.DetailHeadingNextSlice>;

/**
 * Component for "DetailHeadingNext" Slices.
 */
const DetailHeadingNext = ({ slice }: DetailHeadingNextProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden z-20 md:-mb-10 ">
      <Bounded className="mt-16 md:mt-24 first-letter">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex place-content-center justify-between">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <div className="flex font-body">
              <div className="py-0 hidden flex-wrap md:block md:pt-1">
                <>{slice.primary.next_project_title}</>
              </div>
              <Button
                field={slice.primary.next_project_link}
                className="pl-3 pr-2"
              >
                <p>next</p>
              </Button>
              <div className="py-0 md:pt-1">
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default DetailHeadingNext;
