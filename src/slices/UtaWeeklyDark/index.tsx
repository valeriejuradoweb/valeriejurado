import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import * as prismic from "@prismicio/client";

/**
 * Props for `UtaWeeklyDark`.
 */
export type UtaWeeklyDarkProps =
  SliceComponentProps<Content.UtaWeeklyDarkSlice>;

/**
 * Component for "UtaWeeklyDark" Slices.
 */
const UtaWeeklyDark = ({ slice }: UtaWeeklyDarkProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="relative bg-black overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <PrismicNextImage field={slice.primary.image_1} />
            <PrismicNextImage field={slice.primary.image_2} />
          </div>
        </section>
      )}
      {slice.variation === "1Image1Video" && (
        <section className="relative bg-black overflow-hidden py-4 md:py-8">
          <div className="block border-8 border-[#2B2B2B] w-[80%] m-auto md:w-[25%] md:absolute md:top-10 md:right-10">
            {prismic.isFilled.linkToMedia(slice.primary.video_2) && (
              <video playsInline autoPlay muted loop className="object-cover">
                <source src={slice.primary.video_2.url} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="flex w-full">
            <div className="w-full md:w-[70%]">
              <PrismicNextImage
                field={slice.primary.image_1}
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UtaWeeklyDark;
