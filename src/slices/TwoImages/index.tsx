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
 * Props for `TwoImages`.
 */
export type TwoImagesProps = SliceComponentProps<Content.TwoImagesSlice>;

/**
 * Component for "TwoImages" Slices.
 */
const TwoImages = ({ slice }: TwoImagesProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="">
            <div className="grid grid-cols-1 justify-center py-8 space-y-10 md:grid-cols-2 md:space-y-0 md:gap-10 md:flex md:py-16">
              <div>
                <PrismicNextImage
                  field={slice.primary.image_1}
                  className="w-screen md:max-h-[30rem] md:w-auto"
                />
                <div className="space-y-1 mt-8 md:mt-4 md:space-y-2">
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
              <div>
                <PrismicNextImage
                  field={slice.primary.image_2}
                  className="w-screen md:max-h-[30rem] md:w-auto"
                />
              </div>
            </div>
          </Bounded>
        </section>
      )}
      {slice.variation === "alignLeft" && (
        <section className="bg-white overflow-hidden">
          <div className="py-8 space-y-10 block md:space-y-0 md:gap-10 md:flex md:py-16">
            <PrismicNextImage
              field={slice.primary.image_1}
              className="w-screen md:max-h-[30rem] md:w-auto"
            />
            <PrismicNextImage
              field={slice.primary.image_2}
              className="w-screen md:max-h-[30rem] md:w-auto"
            />
            <div className="space-y-1 px-7 md:px-0 md:space-y-2">
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
        </section>
      )}
      {slice.variation === "alignRight" && (
        <section className="bg-white overflow-hidden">
          <div className="float-right py-8 space-y-10 block md:space-y-0 md:gap-10 md:flex md:py-16">
            <div className="space-y-1 px-7 md:px-0 md:space-y-2">
              <PrismicRichText
                field={slice.primary.title_label}
                components={components}
              />
              <PrismicRichText
                field={slice.primary.project_description}
                components={components}
              />
            </div>
            <PrismicNextImage
              field={slice.primary.image_1}
              className="w-screen md:max-h-[30rem] md:w-auto"
            />
            <PrismicNextImage
              field={slice.primary.image_2}
              className="w-screen md:max-h-[30rem] md:w-auto"
            />
          </div>
        </section>
      )}
      {slice.variation === "variedSize" && (
        <section className="bg-white overflow-hidden">
          <Bounded className="">
            <div className="grid grid-cols-1 items-center justify-center py-4 md:grid-cols-2 md:space-y-0 md:gap-10 md:flex md:py-8">
              <div>
                <PrismicNextImage
                  field={slice.primary.image_1}
                  className="w-screen md:max-h-[30rem] md:w-auto"
                />
                <div className="space-y-1 mt-8 md:mt-4 md:space-y-2">
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
              <div>
                <PrismicNextImage
                  field={slice.primary.image_2}
                  className="w-screen md:max-h-[20rem] md:w-auto"
                />
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default TwoImages;
