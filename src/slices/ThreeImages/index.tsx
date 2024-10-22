import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

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
    <p className="text-base leading-7 font-body md:max-w-md md:text-base">
      {children}
    </p>
  ),
};

/**
 * Props for `ThreeImages`.
 */
export type ThreeImagesProps = SliceComponentProps<Content.ThreeImagesSlice>;

/**
 * Component for "ThreeImages" Slices.
 */
const ThreeImages = ({ slice }: ThreeImagesProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="bg-white overflow-hidden py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            <div className="aspect-w-3 aspect-h-4">
              <PrismicNextImage
                field={slice.primary.image_1}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-w-3 aspect-h-4 hidden md:block">
              <PrismicNextImage
                field={slice.primary.image_2}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-w-3 aspect-h-4 hidden md:block">
              <PrismicNextImage
                field={slice.primary.image_3}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-1 mt-8 px-7 md:px-4 md:mt-4 md:space-y-2">
            <PrismicRichText
              field={slice.primary.title_label}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.project_description}
              components={components}
            />
          </div>
        </section>
      )}
      {slice.variation === "collage" && (
        <section className="bg-white overflow-hidden py-8 md:py-16">
          <div className="grid md:grid-cols-3 mb-10 md:-mb-40">
            <div className="space-y-1 hidden md:block md:space-y-2 md:place-self-center">
              <PrismicRichText
                field={slice.primary.title_label}
                components={components}
              />
              <PrismicRichText
                field={slice.primary.project_description}
                components={components}
              />
            </div>
            <div className="col-span-2 aspect-w-4 aspect-h-3">
              <PrismicNextImage
                field={slice.primary.image_1}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="grid gap-10 md:gap-40 grid-cols-3">
            <div className="col-span-2 aspect-w-4 aspect-h-3">
              <PrismicNextImage
                field={slice.primary.image_2}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-w-6 aspect-h-7">
              <PrismicNextImage
                field={slice.primary.image_3}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-1 block mt-8 px-7 md:hidden">
            <PrismicRichText
              field={slice.primary.title_label}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.project_description}
              components={components}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default ThreeImages;
