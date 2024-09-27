import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="xs" className="font-medium">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base font-body mb-4 md:mb-8 md:max-w-md md:text-base">
      {children}
    </p>
  ),
};

/**
 * Props for `ImageText`.
 */
export type ImageTextProps = SliceComponentProps<Content.ImageTextSlice>;

/**
 * Component for "ImageText" Slices.
 */
const ImageText = ({ slice }: ImageTextProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex gap-14 items-center">
                <PrismicNextImage
                  className="w-[50%]"
                  field={slice.primary.image}
                />
                <div className="font-body">
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={components}
                  />
                  <PrismicRichText
                    field={slice.primary.description}
                    components={components}
                  />
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
      {slice.variation === "textLeft" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex gap-14 items-center">
                <div>
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={components}
                  />
                  <PrismicRichText
                    field={slice.primary.description}
                    components={components}
                  />
                </div>
                <PrismicNextImage
                  className="w-[50%]"
                  field={slice.primary.image}
                />
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default ImageText;
