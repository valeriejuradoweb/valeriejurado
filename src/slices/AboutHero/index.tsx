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
              </div>
            </div>
            <div className="mb-8">
              <PrismicRichText
                field={slice.primary.client_list_heading}
                components={components}
              />{" "}
              <div className="">
                <ul className="grid grid-cols-2 gap-x-4 py-2">
                  {slice.primary.client_list.map(({ client, client_link }) => {
                    // Ensure label is not null
                    if (client == null) return null; // If label is null or undefined, skip rendering this button

                    return (
                      <li
                        key={client}
                        className="block pb-1 hover:opacity-65 transition-opacity duration-200 ease-in-out"
                      >
                        <PrismicNextLink field={client_link}>
                          {client}
                        </PrismicNextLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default AboutHero;
