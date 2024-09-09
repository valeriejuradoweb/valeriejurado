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
      <Bounded className="mt-16 md:mt-24">
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
              <Button href="" className="pl-3 pr-2">
                <p>next</p>
              </Button>
              <div className="py-0 md:pt-1">
                <Arrow />
              </div>
            </div>
          </div>
          <div className="font-body my-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8 md:my-8">
            <div className="space-y-6 md:space-y-8">
              <PrismicNextImage field={slice.primary.image_1} />
              <PrismicRichText field={slice.primary.paragraph_2} />
              <PrismicNextImage field={slice.primary.image_2} />
              <PrismicNextImage field={slice.primary.image_4} />
              <PrismicNextImage field={slice.primary.image_6} />
            </div>
            <div className="space-y-6 md:space-y-8">
              <PrismicRichText field={slice.primary.paragraph_1} />
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
            </div>
          </div>
          <div className="flex justify-between font-body">
            <div className="flex">
              <div className="scale-x-[-1] py-0 md:pt-1">
                <Arrow />
              </div>
              <Button href="" className="pl-2 pr-3">
                <p>prev</p>
              </Button>
              <div className="py-0 hidden flex-wrap md:block md:pt-1">
                <>{slice.primary.previous_project_title}</>
              </div>
            </div>
            <div className="flex">
              <div className="py-0 hidden flex-wrap md:block md:pt-1">
                <>{slice.primary.next_project_title}</>
              </div>
              <Button href="" className="pl-3 pr-2">
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

export default Detail;
