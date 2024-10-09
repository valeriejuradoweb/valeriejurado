import { Content } from "@prismicio/client";
import * as prismic from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import TitleLink from "@/components/TitleLink";

/**
 * Props for `ThreePhotoCollage`.
 */
export type ThreePhotoCollageProps =
  SliceComponentProps<Content.ThreePhotoCollageSlice>;

/**
 * Component for "ThreePhotoCollage" Slices.
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
const ThreePhotoCollage = ({ slice }: ThreePhotoCollageProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 relative z-20">
          <div></div>
          <div className="">
            {prismic.isFilled.linkToMedia(slice.primary.video) && (
              <video
                playsInline
                autoPlay
                muted
                loop
                className="w-[100%] md:w-[80%] md:place-self-center"
              >
                <source src={slice.primary.video.url} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="content-center pt-5 md:pt-0 space-y-2">
            {slice.primary.title_link.map(({ link, label }) => (
              <TitleLink field={link} className="">
                {label}
              </TitleLink>
            ))}

            <PrismicRichText
              field={slice.primary.project_description}
              components={components}
            />
            <div className="flex">
              {/*

              -----THIS IS THE THICKER PLUS IF NEEDED-------
              <p className="text-xl pr-1 md:text-2xl md:pr-2">✜</p>*/}
              <p className="text-lg pr-1 md:text-2xl">＋</p>
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
      <div className="relative md:w-[100%] md:-top-20 z-10">
        <div className="relative md:-top-20 md:w-[25%] md:h-auto md:float-right">
          <PrismicNextImage field={slice.primary.photo_1} />
        </div>
        <div className="hidden md:block md:w-[50%] ml-40">
          <PrismicNextImage field={slice.primary.photo_2} />
        </div>
      </div>
    </section>
  );
};

export default ThreePhotoCollage;
