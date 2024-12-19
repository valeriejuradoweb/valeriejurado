import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import TitleLink from "@/components/TitleLink";
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `FilipinoAmericanHeritageMonth`.
 */
export type FilipinoAmericanHeritageMonthProps =
  SliceComponentProps<Content.FilipinoAmericanHeritageMonthSlice>;

/**
 * Component for "FilipinoAmericanHeritageMonth" Slices.
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
const FilipinoAmericanHeritageMonth = ({
  slice,
}: FilipinoAmericanHeritageMonthProps): JSX.Element => {
  const background_image = slice.primary.image_1;
  return (
    <>
      {slice.variation === "default" && (
        <section className="relative bg-black md:bg-transparent">
          {prismic.isFilled.image(background_image) && (
            <PrismicNextImage
              field={slice.primary.desktop_background_image}
              alt=""
              fill={true}
              className="hidden md:block pointer-events-none select-none object-cover -z-50"
            />
          )}

          <Bounded>
            <div className="text-[#DEDEDE] grid grid-cols-1 h-auto md:grid-cols-2 md:h-[900px]">
              <div>
                <PrismicNextImage
                  className="block md:hidden"
                  field={slice.primary.image_1}
                />
              </div>
              <div className="relative justify-self-center space-y-2 md:mt-28">
                <TitleLink field={slice.primary.title_link}>
                  {slice.primary.title_label}
                </TitleLink>
                <PrismicRichText
                  field={slice.primary.description}
                  components={components}
                />
                <div className="flex">
                  <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
                  <Button
                    field={slice.primary.button_link}
                    className="mb-4 md:md-10"
                  >
                    {slice.primary.button_label}
                  </Button>
                </div>
                <div>
                  <PrismicNextImage
                    className="border-8 border-[#2B2B2B] mt-8 md:mt-14 "
                    field={slice.primary.image_2}
                  />
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}

      {slice.variation === "oneImage" && (
        <section className="relative bg-black md:bg-transparent">
          {prismic.isFilled.image(background_image) && (
            <PrismicNextImage
              field={slice.primary.desktop_background_image}
              alt=""
              fill={true}
              className="hidden md:block pointer-events-none select-none object-cover -z-50"
            />
          )}

          <Bounded>
            <div className="text-[#DEDEDE] grid grid-cols-1 h-auto md:grid-cols-2 md:h-[900px]">
              <div className="order-2 md:order-none">
                <PrismicNextImage
                  className="block md:hidden"
                  field={slice.primary.image_1}
                />
              </div>
              <div className="relative justify-self-center space-y-2 mt-10 md:mt-28 md:w-[35%] md:justify-self-end">
                <TitleLink field={slice.primary.title_link}>
                  {slice.primary.title_label}
                </TitleLink>
                <PrismicRichText
                  field={slice.primary.description}
                  components={components}
                />
                <div className="flex">
                  <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
                  <Button
                    field={slice.primary.button_link}
                    className="mb-4 md:md-10"
                  >
                    {slice.primary.button_label}
                  </Button>
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default FilipinoAmericanHeritageMonth;
