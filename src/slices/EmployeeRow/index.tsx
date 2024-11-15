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
 * Props for `EmployeeRow`.
 */
export type EmployeeRowProps = SliceComponentProps<Content.EmployeeRowSlice>;

/**
 * Component for "EmployeeRow" Slices.
 */
const EmployeeRow = ({ slice }: EmployeeRowProps): JSX.Element => {
  return (
    <section className="relative bg-neutral-400">
      <Bounded>
        <div className="grid grid-cols-1 text-[#DEDEDE] gap-6 py-6 md:gap-4 md:grid-cols-3 ">
          <div>
            <div className="aspect-w-16 aspect-h-11 mb-2">
              <PrismicNextImage
                className="object-cover w-full h-full"
                field={slice.primary.employee_photo}
              />
            </div>

            <PrismicRichText
              field={slice.primary.employee_name}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.employee_bio}
              components={components}
            />
          </div>
          <div>
            <div className="aspect-w-16 aspect-h-11 mb-2">
              <PrismicNextImage
                className="object-cover w-full h-full"
                field={slice.primary.employee_photo_2}
              />
            </div>

            <PrismicRichText
              field={slice.primary.employee_name_2}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.employee_bio_2}
              components={components}
            />
          </div>
          <div>
            <div className="aspect-w-16 aspect-h-11 mb-2">
              <PrismicNextImage
                className="object-cover w-full h-full"
                field={slice.primary.employee_photo_3}
              />
            </div>

            <PrismicRichText
              field={slice.primary.employee_name_3}
              components={components}
            />
            <PrismicRichText
              field={slice.primary.employee_bio_3}
              components={components}
            />
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default EmployeeRow;
