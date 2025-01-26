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
import LogoGoldLg from "@/components/LogoGoldLg";
import ArrowDown from "@/components/ArrowDown";
import LogoGoldSm from "@/components/LogoGoldSm";

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
      {slice.variation === "largeLogo" && (
        <section className="relative bg-black">
          {/*BELOW IS DESKTOP LOGO, NAV, ARROW ITEMS */}
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <LogoGoldLg width="55vw" height="flex" />
            <ul className="w-full space-x-10 justify-center flex text-[#DEDEDE] font-display tracking-widest font-thin md:mt-5 md:text-xl lg:mt-10 lg:text-2xl 2xl:space-x-16 2xl:text-3xl ">
              {slice.primary.links.map(({ link, label }) => (
                <li key={label}>
                  <div className="hover:opacity-65 transition-opacity duration-200 ease-in-out">
                    <PrismicNextLink field={link}>{label}</PrismicNextLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <ArrowDown width="2vw" height="flex" />
          </div>
          {/*BELOW IS MOBILE LOGO, NAV, ARROW ITEMS */}
          <div className="absolute justify-center text-center top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 block md:hidden">
            <LogoGoldLg width="80vw" height="flex" />
            <ul className="mt-5 space-y-3 text-[#DEDEDE] font-display tracking-widest font-thin text-lg">
              {slice.primary.links.map(({ link, label }) => (
                <li key={label}>
                  <div className="hover:opacity-65 transition-opacity duration-200 ease-in-out">
                    <PrismicNextLink field={link}>{label}</PrismicNextLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute top-[64%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 block md:hidden">
            <ArrowDown width="4vw" height="flex" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="justify-self-end">
              <PrismicNextImage
                className="rotate-180 w-72 md:h-full md:w-auto md:rotate-0"
                field={slice.primary.image_left}
              />
            </div>
            <div className="hidden md:block"></div>
            <div>
              <PrismicNextImage
                className="hidden md:block md:h-full md:w-auto"
                field={slice.primary.image_right}
              />
              <PrismicNextImage
                className="block w-[90%] md:hidden"
                field={slice.primary.image_mobile_lower}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
