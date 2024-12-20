import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import IconInsta from "@/components/IconInsta";
import IconMail from "@/components/IconMail";
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
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

  heading3: ({ children }) => (
    <Heading as="h3" size="xxs" className="font-semibold">
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
      className="relative bg-black md:bg-black"
    >
      {/*{prismic.isFilled.image(background_image) && (
        <PrismicNextImage
          field={slice.primary.background_image}
          alt=""
          fill={true}
          className="pointer-events-none select-none object-cover object-left-top -z-50 md:block"
        />
      )}*/}
      <PrismicNextImage
        className="block md:hidden"
        field={slice.primary.mobile_background_image}
      />
      <Bounded className="font-body font-thin text-[#DEDEDE]">
        <div className="grid mt-0 md:grid-cols-3 md:pt-[8rem]">
          <div className="md:col-span-2">
            <PrismicNextImage
              className="hidden md:block"
              field={slice.primary.background_image}
            />
          </div>
          <div className="relative right-0 col-span-1">
            <div className=" md:right-0">
              <PrismicRichText
                field={slice.primary.bio_heading}
                components={components}
              />
              <div className="mt-4 space-y-2">
                <PrismicRichText
                  field={slice.primary.bio}
                  components={components}
                />
              </div>
              <div className="py-6 flex gap-10">
                <PrismicNextLink
                  field={slice.primary.mail_link}
                  className="hover:opacity-65 transition-opacity duration-200 ease-in-out"
                >
                  <IconMail />
                </PrismicNextLink>
                <PrismicNextLink
                  field={slice.primary.instagram_link}
                  className="hover:opacity-65 transition-opacity duration-200 ease-in-out"
                >
                  <IconInsta />
                </PrismicNextLink>
                {/*} {slice.primary.button.map(({ link, label }) => {
                  // Ensure label is not null
                  if (label == null) return null; // If label is null or undefined, skip rendering this button

                  return (
                    <div key={label} className="block py-2">
                      <div className="flex">
                        <p className="text-lg pr-1 md:text-2xl">＋</p>
                        <Button field={link} className="">
                          {label}
                        </Button>
                      </div>
                    </div>
                  );
                })} */}
              </div>
            </div>
            <div className="mb-8">
              <PrismicRichText
                field={slice.primary.client_list_heading}
                components={components}
              />{" "}
              <div className="grid grid-cols-2 mt-2">
                <div>
                  <PrismicRichText
                    field={slice.primary.client_list_1}
                    components={components}
                  />
                </div>
                <div>
                  <PrismicRichText
                    field={slice.primary.client_list_2}
                    components={components}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="block text-[#DEDEDE] space-y-10 mt-10 md:space-y-0 md:mt-32 md:flex md:flex-wrap gap-4">
          {slice.primary.employee.map(
            ({ employee_photo, employee_name, employee_bio }) => (
              <div className="md:basis-[32%] space-y-1">
                <div className="w-full max-w-sm">
                  <div className="aspect-w-16 aspect-h-11 mb-2">
                    <PrismicNextImage
                      className="object-cover w-full h-full"
                      field={employee_photo}
                    />
                  </div>
                </div>

                <PrismicRichText
                  field={employee_name}
                  components={components}
                />
                <PrismicRichText field={employee_bio} components={components} />
              </div>
            )
          )}
        </div>*/}
        {/*<div className="block text-[#DEDEDE] space-y-10 mt-10 md:space-y-0 md:mt-32 md:flex md:flex-wrap gap-4">
          <div className="w-full max-w-sm">
            <div className="aspect-w-16 aspect-h-11 mb-2">
              <PrismicNextImage
                className="object-cover w-full h-full"
                field={slice.primary.employee_photo}
              />
            </div>
          </div>
          <PrismicRichText
            field={slice.primary.employee_name}
            components={components}
          />
          <PrismicRichText
            field={slice.primary.employee_bio}
            components={components}
          />
        </div>*/}
      </Bounded>
    </section>
  );
};

export default AboutHero;
