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
          <Bounded>
            <div className="mx-auto w-full max-w-4xl">
              <div className="items-center grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-14">
                <div className="aspect-w-5 aspect-h-7">
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="object-cover w-full h-full"
                  />
                </div>
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
              </div>
            </div>
          </Bounded>
        </section>
      )}
      {slice.variation === "textLeft" && (
        <section className="bg-white overflow-hidden">
          <Bounded>
            <div className="mx-auto w-full max-w-4xl">
              <div className="items-center grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-14">
                <div className="order-2 md:order-none">
                  <PrismicRichText
                    field={slice.primary.heading}
                    components={components}
                  />
                  <PrismicRichText
                    field={slice.primary.description}
                    components={components}
                  />
                </div>
                <div className="aspect-w-5 aspect-h-7 order-1 md:order-none">
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default ImageText;
