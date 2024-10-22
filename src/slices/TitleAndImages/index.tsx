import Arrow from "@/components/Arrow";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import * as prismic from "@prismicio/client";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="sm" className="mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),

  heading2: ({ children }) => (
    <Heading as="h2" size="xs" className="font-medium">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base leading-7 font-body md:max-w-[24rem] md:text-base">
      {children}
    </p>
  ),
};

/**
 * Props for `TitleAndImages`.
 */
export type TitleAndImagesProps =
  SliceComponentProps<Content.TitleAndImagesSlice>;

/**
 * Component for "TitleAndImages" Slices.
 */
const TitleAndImages = ({ slice }: TitleAndImagesProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="mt-16 py-8 md:mt-24">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex">
                <div className="scale-x-[-1] py-0 md:pt-1">
                  <Arrow />
                </div>
                <Button field={slice.primary.back_link} className="pl-2 pr-3">
                  <p>{slice.primary.back_label}</p>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 mt-8 h-auto md:h-[28rem] md:mb-[4rem] lg:h-[40rem]">
                <div className="space-y-6 md:space-y-16">
                  <div className="space-y-2 md:space-y-4">
                    <PrismicRichText
                      field={slice.primary.title}
                      components={components}
                    />
                    <PrismicRichText
                      field={slice.primary.description}
                      components={components}
                    />
                  </div>
                  <div className="relative z-20 space-y-4 md:absolute md:w-[47%] ">
                    <div className="aspect-w-5 aspect-h-3">
                      <PrismicNextImage
                        field={slice.primary.image_1}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <PrismicRichText
                        field={slice.primary.title_label}
                        components={components}
                      />
                      <PrismicRichText
                        field={slice.primary.project_description}
                        components={components}
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden z-10 relative md:top-40 md:w-[38%] md:right-0 md:block md:absolute">
                  <div className="aspect-w-3 aspect-h-4">
                    <PrismicNextImage
                      className="object-cover w-full h-full"
                      field={slice.primary.image_2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
      {slice.variation === "2Images1Video" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="mt-16 py-8 md:mt-24">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex">
                <div className="scale-x-[-1] py-0 md:pt-1">
                  <Arrow />
                </div>
                <Button field={slice.primary.back_link} className="pl-2 pr-3">
                  <p>{slice.primary.back_label}</p>
                </Button>
              </div>
              <div className="grid mt-8 gap-5 md:grid-cols-2 md:gap-0 h-auto md:h-[60rem]">
                <div className="space-y-6 md:space-y-8">
                  <div className="space-y-2 md:space-y-4">
                    <PrismicRichText
                      field={slice.primary.title}
                      components={components}
                    />
                    <PrismicRichText
                      field={slice.primary.description}
                      components={components}
                    />
                  </div>
                  <div className="hidden space-y-1 md:block md:space-y-2">
                    <PrismicRichText
                      field={slice.primary.title_label}
                      components={components}
                    />
                    <PrismicRichText
                      field={slice.primary.project_description}
                      components={components}
                    />
                  </div>

                  <div className="z-10 md:absolute md:left-0 md:gap-10 md:flex md:w-[30rem]">
                    <PrismicNextImage field={slice.primary.image_1} />

                    <PrismicNextImage
                      field={slice.primary.image_2}
                      className="hidden md:block"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="mb-4 md:w-80 md:float-right">
                    <div className="aspect-w-5 aspect-h-7">
                      {prismic.isFilled.linkToMedia(slice.primary.video) && (
                        <video
                          playsInline
                          autoPlay
                          muted
                          loop
                          className="z-20 object-cover w-full h-full"
                        >
                          <source
                            src={slice.primary.video.url}
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                    <div className="block mt-4 space-y-1 md:hidden md:space-y-2">
                      <PrismicRichText
                        field={slice.primary.title_label}
                        components={components}
                      />
                      <PrismicRichText
                        field={slice.primary.project_description}
                        components={components}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
      {slice.variation === "noImages" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="mt-16 py-8 md:mt-24">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex">
                <div className="scale-x-[-1] py-0 md:pt-1">
                  <Arrow />
                </div>
                <Button field={slice.primary.back_link} className="pl-2 pr-3">
                  <p>{slice.primary.back_label}</p>
                </Button>
              </div>

              <div className="space-y-2 mt-8 md:space-y-4">
                <PrismicRichText
                  field={slice.primary.title}
                  components={components}
                />
                <PrismicRichText
                  field={slice.primary.description}
                  components={components}
                />
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default TitleAndImages;
