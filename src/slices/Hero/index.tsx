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

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="xl"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0"
    >
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
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const background_image = slice.primary.background_image;

  return (
    <>
      {slice.variation === "default" && (
        <section className="relative  md:bg-black/[.1]">
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
            className="px-4 py-10 h-[48rem] md:h-svh md:py-20 md:px-6 lg:py-20"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            <div className="text-white grid text-left grid-cols-2 md:grid-cols-3 md:py-14">
              <div></div>
              <div></div>
              <div className="mt-[12rem] bg-black/[.4] md:mt-[0rem]">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={components}
                />
                <PrismicRichText
                  field={slice.primary.body}
                  components={components}
                />
                <Button
                  field={slice.primary.button_link}
                  className="mb-8 md:md-10"
                >
                  {slice.primary.button_text}
                </Button>
              </div>
            </div>
          </Bounded>
        </section>
      )}{" "}
      {slice.variation === "light" && (
        <section className="relative">
          {prismic.isFilled.image(background_image) && (
            <PrismicNextImage
              field={slice.primary.background_image}
              alt=""
              fill={true}
              className="pointer-events-none select-none object-cover -z-50"
            />
          )}

          <Bounded
            className="px-4 py-10 h-[48rem] md:h-svh md:py-20 md:px-6 lg:py-20"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            <div className="text-black grid text-left grid-cols-2 md:grid-cols-3 md:py-14">
              <div>
                <PrismicRichText
                  field={slice.primary.heading}
                  components={components}
                />
                <PrismicRichText
                  field={slice.primary.body}
                  components={components}
                />
                <Button
                  field={slice.primary.button_link}
                  className="mb-8 md:md-10"
                >
                  {slice.primary.button_text}
                </Button>
              </div>
              <div>
                {prismic.isFilled.linkToMedia(slice.primary.video) && (
                  <video playsInline autoPlay muted loop>
                    <source src={slice.primary.video.url} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="mt-[12rem] md:mt-[0rem]"></div>
            </div>
          </Bounded>
        </section>
      )}{" "}
    </>
  );
};

export default Hero;
