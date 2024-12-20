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
import ArrowLight from "@/components/ArrowLight";

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

  heading2: ({ children }) => (
    <Heading as="h2" size="xs" className="font-medium font-body">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base leading-7 font-medium font-body mb-4 max-w-[12rem] md:mb-8 md:max-w-[22rem] md:text-xl md:leading-9 md:font-semibold">
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
        <section className="relative  md:bg-black">
          {/*{prismic.isFilled.image(background_image) && (
            <PrismicNextImage
              field={slice.primary.background_image}
              alt=""
              fill={true}
              className="hidden md:block pointer-events-none select-none object-cover -z-50"
            />
          )}*/}
          {prismic.isFilled.image(background_image) && (
            <PrismicNextImage
              field={slice.primary.mobile_background_image}
              alt=""
              fill={true}
              className="block pointer-events-none select-none object-cover -z-50 md:hidden"
            />
          )}

          <div
            className="px-4 py-10 h-[98svh] md:h-[98svh] md:py-0 md:px-0 lg:py-0"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            <div className="text-[#DEDEDE] grid text-left grid-cols-2 md:grid-cols-3 md:gap-10 md:h-[98svh]">
              <div className="col-span-2 relative">
                {prismic.isFilled.image(background_image) && (
                  <PrismicNextImage
                    field={slice.primary.background_image}
                    alt=""
                    className="pointer-events-none select-none object-right object-cover h-full hidden md:block "
                  />
                )}
              </div>

              <div className="mt-[10rem] bg-black/[.4] md:h-full md:mt-[50%]">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={components}
                />

                <ul className="space-y-4">
                  {slice.primary.links.map(({ link, label }) => (
                    <li key={label}>
                      <div className="flex">
                        <p className="text-lg pr-1 md:text-2xl">＋</p>
                        <Button field={link}>{label}</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="animate-bounce font-body font-medium absolute -bottom-6 -translate-x-2/4 -translate-y-2/4 flex text-white bg-[#121212] z-40 py-2 px-4 drop-shadow-xl left-[27%] md:left-[43%]">
              <div className="rotate-90">
                <ArrowLight />
              </div>
              <h2 className="pr-[.75rem] pl-[1.1rem]">selected works</h2>
              <div className="rotate-90">
                <ArrowLight />
              </div>
            </div>
          </div>
        </section>
      )}{" "}
      {slice.variation === "light" && (
        <section className="relative bg-white overflow-hidden">
          <Bounded
            className="px-4 pt-[7rem] md:pt-[8rem] md:px-6 lg:pt-[6rem]" /*md:h-svh*/
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            <div className="grid md:grid-cols-2 ">
              <div className="">
                {prismic.isFilled.linkToMedia(slice.primary.video) && (
                  <video
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="w-[100%] scale-x-[-1] hidden md:block"
                  >
                    <source src={slice.primary.video.url} type="video/mp4" />
                  </video>
                )}
              </div>
              <div>
                {prismic.isFilled.linkToMedia(slice.primary.video) && (
                  <video playsInline autoPlay muted loop className="w-[100%]">
                    <source src={slice.primary.video.url} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>

            <div className="w-[100%] py-8">
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />
            </div>
          </Bounded>
        </section>
      )}{" "}
    </>
  );
};

export default Hero;
