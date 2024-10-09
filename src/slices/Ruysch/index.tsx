import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import NavLink from "@/components/NavLink";
import SequenceLabel from "@/components/SequenceLabel";
import SequenceLabelWhite from "@/components/SequenceLabelWhite";
import TitleLink from "@/components/TitleLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Ruysch`.
 */
export type RuyschProps = SliceComponentProps<Content.RuyschSlice>;

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
    <p className="text-base leading-7 font-thin font-body max-w-none md:max-w-[22rem] md:text-xl md:leading-9">
      {children}
    </p>
  ),
};
/**
 * Component for "Ruysch" Slices.
 */
const Ruysch = ({ slice }: RuyschProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="relative bg-black text-[#DEDEDE] overflow-hidden py-8">
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2">
            <div>
              {/*---MOBILE TEXT RENDER-----*/}
              <div className="space-y-2 grid place-items-center pt-8 md:hidden">
                <NavLink field={slice.primary.heading_link}>
                  {slice.primary.heading_label}
                </NavLink>
                <PrismicRichText
                  field={slice.primary.heading_description}
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
              <PrismicNextImage field={slice.primary.image_1} />
            </div>
            <div className="space-y-0 md:space-y-20">
              {/*----DESKTOP TEXT RENDER-----*/}
              <div className="space-y-2 hidden md:block">
                <NavLink field={slice.primary.heading_link}>
                  {slice.primary.heading_label}
                </NavLink>
                <PrismicRichText
                  field={slice.primary.heading_description}
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
              <div className="flex gap-6 md:gap-8">
                <SequenceLabelWhite>
                  <PrismicRichText
                    field={slice.primary.sequence_label}
                    components={components}
                  />
                </SequenceLabelWhite>
                <div className="space-y-2">
                  <TitleLink field={slice.primary.title_link}>
                    {slice.primary.title_label}
                  </TitleLink>
                  <PrismicRichText
                    field={slice.primary.title_description}
                    components={components}
                  />
                </div>
              </div>
            </div>
          </div>

          <Bounded className="py-8">
            <div></div>
          </Bounded>
        </section>
      )}

      {slice.variation === "ruysch2" && (
        <section className="relative bg-black text-[#DEDEDE] overflow-hidden">
          <div className="grid grid-cols-1 px-7 md:px-0 md:grid-cols-3 md:gap-16">
            <div></div>
            <div className="space-y-6">
              <div className="grid place-items-center">
                <SequenceLabelWhite>
                  <PrismicRichText
                    field={slice.primary.sequence_label_2}
                    components={components}
                  />
                </SequenceLabelWhite>
              </div>
              <PrismicNextImage
                className="border-8 border-[#2B2B2B]"
                field={slice.primary.image_2}
              />

              <div className="space-y-2">
                <TitleLink field={slice.primary.title_link_2}>
                  {slice.primary.title_label_2}
                </TitleLink>
                <PrismicRichText
                  field={slice.primary.description}
                  components={components}
                />
              </div>
            </div>

            <div></div>
          </div>

          <Bounded className="py-8">
            <div></div>
          </Bounded>
        </section>
      )}

      {slice.variation === "ruysch3" && (
        <section className="relative bg-black text-[#DEDEDE] overflow-hidden py-6">
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2">
            <div className="flex place-items-center gap-6 md:gap-8 md:mt-0 md:order-none">
              <div>
                <SequenceLabelWhite>
                  <PrismicRichText
                    field={slice.primary.sequence_label_3}
                    components={components}
                  />
                </SequenceLabelWhite>
              </div>
              <div className="space-y-2">
                <TitleLink field={slice.primary.title_link_3}>
                  {slice.primary.title_label_3}
                </TitleLink>
                <PrismicRichText
                  field={slice.primary.description}
                  components={components}
                />
              </div>
            </div>
            <div>
              <PrismicNextImage field={slice.primary.image_3} />
            </div>
          </div>

          <Bounded className="py-8">
            <div></div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default Ruysch;
