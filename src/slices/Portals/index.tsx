import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import NavLink from "@/components/NavLink";
import SequenceLabel from "@/components/SequenceLabel";
import TitleLink from "@/components/TitleLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Portals`.
 */
export type PortalsProps = SliceComponentProps<Content.PortalsSlice>;

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
 * Component for "Portals" Slices.
 */
const Portals = ({ slice }: PortalsProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <section className="relative bg-white overflow-hidden">
          <div className="hidden md:block">
            <PrismicNextImage field={slice.primary.image_1} />
          </div>

          <Bounded>
            <div className="grid gap-none md:gap-20 md:grid-cols-2">
              <div className="flex items-center mb-4 md:mb-none">
                <div className="space-y-2 text-center md:text-left">
                  <NavLink field={slice.primary.heading_link}>
                    {slice.primary.heading_label}
                  </NavLink>
                  <PrismicRichText
                    field={slice.primary.heading_description}
                    components={components}
                  />
                  <div className="flex justify-center md:justify-normal">
                    <p className="text-lg -ml-1 pr-1 md:text-2xl">＋</p>
                    <Button
                      field={slice.primary.button_link}
                      className="mb-4 md:md-10"
                    >
                      {slice.primary.button_text}
                    </Button>
                  </div>
                  <div className="block md:hidden">
                    <PrismicNextImage field={slice.primary.mobile_image_1} />
                  </div>
                </div>
              </div>
              <div className="items-end gap-4 flex md:items-center">
                <div>
                  <SequenceLabel>
                    <PrismicRichText
                      field={slice.primary.sequence_label}
                      components={components}
                    />
                  </SequenceLabel>
                  <div className="block md:hidden">
                    <TitleLink field={slice.primary.title_link}>
                      {slice.primary.title_label}
                    </TitleLink>
                    <PrismicRichText
                      field={slice.primary.project_description}
                      components={components}
                    />
                  </div>
                </div>
                <div className="w-[100%] md:w-auto">
                  <div className="absolute bottom-12 md:relative md:bottom-0">
                    <PrismicNextImage field={slice.primary.image_2} />
                  </div>
                  <div className="hidden md:block">
                    <TitleLink field={slice.primary.title_link}>
                      {slice.primary.title_label}
                    </TitleLink>
                    <PrismicRichText
                      field={slice.primary.project_description}
                      components={components}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
      ,
      {slice.variation === "portals2" && (
        <section className="relative bg-white overflow-hidden">
          <Bounded>
            <div className="flex">
              <PrismicNextImage field={slice.primary.image_3} />
              <PrismicNextImage field={slice.primary.image_4} />
              <PrismicNextImage field={slice.primary.image_5} />
            </div>
          </Bounded>
        </section>
      )}
      ,
      {slice.variation === "portals3" && (
        <section className="relative bg-white overflow-hidden">
          <Bounded>
            <div className="block md:hidden"></div>
          </Bounded>
        </section>
      )}
      ,
    </>
  );
};

export default Portals;
