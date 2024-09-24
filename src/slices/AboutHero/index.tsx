import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="xs" className="font-medium">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base leading-7 font-thin font-body md:text-base">
      {children}
    </p>
  ),
};
/**
 * Props for `AboutHero`.
 */
export type AboutHeroProps = SliceComponentProps<Content.AboutHeroSlice>;

/**
 * Component for "AboutHero" Slices.
 */
const AboutHero = ({ slice }: AboutHeroProps): JSX.Element => {
  const background_image = slice.primary.background_image;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-black md:bg-black/[.01]"
    >
      {prismic.isFilled.image(background_image) && (
        <PrismicNextImage
          field={slice.primary.background_image}
          alt=""
          fill={true}
          className="pointer-events-none select-none object-cover object-left-top -z-50 md:block"
        />
      )}
      <PrismicNextImage
        className="block md:hidden"
        field={slice.primary.mobile_background_image}
      />
      <Bounded className="font-body font-thin text-white">
        <div className="grid mt-0 md:grid-cols-2 md:gap-10 md:mt-[8rem]">
          <div></div>
          <div className="relative right-0">
            <div className="md:w-[70%] md:right-0">
              <PrismicRichText
                field={slice.primary.bio}
                components={components}
              />
              <div className="flex mt-4 md:mt-4">
                <p className="text-lg pr-1 md:text-2xl">＋</p>
                <Button
                  field={slice.primary.button_link}
                  className="mb-12 md:md-10 "
                >
                  {slice.primary.button_text}
                </Button>
              </div>
            </div>
            <div>
              <PrismicRichText
                field={slice.primary.client_list_heading}
                components={components}
              />{" "}
              <div className="grid grid-cols-2 mt-6">
                <div>
                  <PrismicRichText field={slice.primary.client_list_1} />
                </div>
                <div>
                  <PrismicRichText field={slice.primary.client_list_2} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block text-white space-y-10 mt-10 md:space-y-0 md:mt-32 md:flex md:flex-wrap gap-4">
          {slice.primary.employee.map(
            ({ employee_photo, employee_name, employee_bio }) => (
              <div className="md:basis-[32%]">
                <PrismicNextImage field={employee_photo} />
                <PrismicRichText
                  field={employee_name}
                  components={components}
                />
                <PrismicRichText field={employee_bio} />
              </div>
            )
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default AboutHero;
