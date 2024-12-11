import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import TitleLink from "@/components/TitleLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `UtaArtistSpace`.
 */
export type UtaArtistSpaceProps =
  SliceComponentProps<Content.UtaArtistSpaceSlice>;

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
    <p className="text-base leading-7 font-light font-body md:max-w-[400px] md:text-xl md:leading-8">
      {children}
    </p>
  ),
};

/**
 * Component for "UtaArtistSpace" Slices.
 */
const UtaArtistSpace = ({ slice }: UtaArtistSpaceProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className="grid md:grid-cols-2 mb-10 md:mb-20">
          <div className="mb-5 md:mb-0">
            <div className="space-y-2 mb-5 mt-8 md:mt-10">
              <TitleLink field={slice.primary.title_link}>
                {slice.primary.title_label}
              </TitleLink>
              <PrismicRichText
                field={slice.primary.title_description}
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

            <PrismicNextImage
              field={slice.primary.image_2}
              className="w-96 mt-10 mb-5 hidden md:block"
            />
          </div>
          <div className="mb-5">
            <PrismicNextImage
              field={slice.primary.image_1}
              className="relative md:top-40 md:w-[45rem] md:absolute"
            />
          </div>
          <div>
            <TitleLink field={slice.primary.project_1_title_link}>
              {slice.primary.project_1_title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.project_1_description}
              components={components}
            />
          </div>
        </div>
        <div className="block mb-10 md:mb-0 md:gap-10 md:flex">
          <div className="md:w-[60rem]">
            <PrismicNextImage field={slice.primary.image_3} />
          </div>
          <div className="place-self-end mt-5 md:mt-0">
            <TitleLink field={slice.primary.project_2_title_link}>
              {slice.primary.project_2_title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.project_2_description}
              components={components}
            />

            <PrismicNextImage
              field={slice.primary.image_4}
              className="hidden w-[35rem] mt-5 md:block"
            />
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2 md:mt-40 md:gap-24">
          <div className="">
            <PrismicNextImage field={slice.primary.image_5} className="mb-5" />
            <TitleLink field={slice.primary.project_3_title_link}>
              {slice.primary.project_3_title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.project_3_description}
              components={components}
            />
          </div>
          <div className="mb-8">
            <PrismicNextImage field={slice.primary.image_6} className="mb-5" />
            <TitleLink field={slice.primary.project_4_title_link}>
              {slice.primary.project_4_title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.project_4_description}
              components={components}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 mb-10 h-auto md:mb-20 md:h-[60rem]">
          <div className="mb-5 md:mb-0">
            <PrismicNextImage
              field={slice.primary.image_8}
              className="w-96 mt-10 mb-5 hidden md:block"
            />
            <div className="hidden md:block">
              <TitleLink field={slice.primary.project_5_title_link}>
                {slice.primary.project_5_title_label}
              </TitleLink>
              <PrismicRichText
                field={slice.primary.project_5_description}
                components={components}
              />
            </div>
          </div>
          <div className="mb-5">
            <PrismicNextImage
              field={slice.primary.image_7}
              className="relative md:bottom-10 md:w-[45rem] md:absolute"
            />
          </div>
          <div className="block md:hidden">
            <TitleLink field={slice.primary.project_5_title_link}>
              {slice.primary.project_5_title_label}
            </TitleLink>
            <PrismicRichText
              field={slice.primary.project_5_description}
              components={components}
            />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default UtaArtistSpace;
