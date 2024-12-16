import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismic from "@prismicio/client";

/**
 * Props for `FourImages`.
 */
export type FourImagesProps = SliceComponentProps<Content.FourImagesSlice>;

/**
 * Component for "FourImages" Slices.
 */
const FourImages = ({ slice }: FourImagesProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="bg-white overflow-hidden py-4 md:py-8">
          <div className="pb-8 space-y-8 block md:space-y-0 md:gap-10 md:flex md:justify-end md:py-8">
            <PrismicNextImage
              field={slice.primary.image_1}
              className="w-screen md:max-h-[32rem] md:w-auto"
            />

            {prismic.isFilled.linkToMedia(slice.primary.video_1) && (
              <video
                playsInline
                autoPlay
                muted
                loop
                className="w-screen md:max-h-[32rem] md:w-auto"
              >
                <source src={slice.primary.video_1.url} type="video/mp4" />
              </video>
            )}
          </div>

          <div className="space-y-8 md:space-y-0 md:flex md:space-x-10 md:-mt-32">
            <div className="md:max-w-[20rem]">
              {prismic.isFilled.linkToMedia(slice.primary.video_2) && (
                <video playsInline autoPlay muted loop className="">
                  <source src={slice.primary.video_2.url} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="md:max-w-[20rem]">
              {prismic.isFilled.linkToMedia(slice.primary.video_3) && (
                <video playsInline autoPlay muted loop className="">
                  <source src={slice.primary.video_3.url} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </section>
      )}
      {slice.variation === "1Video3Images" && (
        <section className="bg-white overflow-hidden py-4 md:py-8">
          <div className="block pt-0 md:absolute md:right-0 md:pt-16">
            <PrismicNextImage
              field={slice.primary.image_2}
              className="w-screen mb-8 md:max-h-[20rem] md:w-auto md:mb-10"
            />
            <PrismicNextImage
              field={slice.primary.image_3}
              className="w-screen mb-8 md:max-h-[20rem] md:w-auto"
            />
          </div>
          <div className="space-y-8 block md:space-y-0 md:gap-10 md:flex md:py-8">
            {prismic.isFilled.linkToMedia(slice.primary.video_1) && (
              <video
                playsInline
                autoPlay
                muted
                loop
                className="w-screen md:max-h-[48rem] md:w-auto"
              >
                <source src={slice.primary.video_1.url} type="video/mp4" />
              </video>
            )}
            <PrismicNextImage
              field={slice.primary.image_1}
              className="w-screen md:max-h-[48rem] md:w-auto"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default FourImages;
