import { Content } from "@prismicio/client";
import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import TitleLink from "@/components/TitleLink";
import Arrow from "@/components/Arrow";

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
 * Props for `Detail`.
 */
export type DetailProps = SliceComponentProps<Content.DetailSlice>;

/**
 * Component for "Detail" Slices.
 */
const Detail = ({ slice }: DetailProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded className="">
        <div className="mx-auto w-full max-w-4xl">
          <div className="font-body my-2 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8 md:my-8">
            <div>
              <div className="block mb-6 md:hidden">
                <PrismicRichText field={slice.primary.paragraph_1} />
              </div>
              <div className="space-y-6 md:space-y-8">
                <PrismicNextImage field={slice.primary.image_1} />
                <PrismicRichText field={slice.primary.paragraph_2} />
                <PrismicNextImage field={slice.primary.image_2} />
                <PrismicNextImage field={slice.primary.image_4} />
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="hidden md:block">
                <PrismicRichText field={slice.primary.paragraph_1} />
              </div>
              {prismic.isFilled.linkToMedia(slice.primary.video) && (
                <video
                  playsInline
                  autoPlay
                  muted
                  loop
                  className="w-[100%] md:w-[100%]"
                >
                  <source src={slice.primary.video.url} type="video/mp4" />
                </video>
              )}
              <PrismicNextImage field={slice.primary.image_3} />
              <PrismicNextImage field={slice.primary.image_5} />
              <PrismicNextImage field={slice.primary.image_6} />
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Detail;
