import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import TitleLink from "@/components/TitleLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

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
/**
 * Props for `FruitsOfOurLabor`.
 */
export type FruitsOfOurLaborProps =
  SliceComponentProps<Content.FruitsOfOurLaborSlice>;

/**
 * Component for "FruitsOfOurLabor" Slices.
 */
const FruitsOfOurLabor = ({ slice }: FruitsOfOurLaborProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <PrismicNextImage field={slice.primary.image_1} />
      <Bounded>
        <div className="grid grid-cols-1 gap-6 my-8 md:gap-10 md:my-20 md:grid-cols-2">
          <div className="order-2 md:order-none">
            <PrismicNextImage field={slice.primary.image_2} />
          </div>
          <div className="order-1 space-y-2 self-center md:order-none">
            <TitleLink field={slice.primary.title_link}>
              {slice.primary.title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.project_description}
              components={components}
            />
            <div className="flex">
              <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
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
    </section>
  );
};

export default FruitsOfOurLabor;
