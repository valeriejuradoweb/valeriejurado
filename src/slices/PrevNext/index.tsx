import Arrow from "@/components/Arrow";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="sm" className="mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className="text-base leading-7 font-light font-body mb-4 md:mb-8 md:max-w-md md:text-xl md:leading-10">
      {children}
    </p>
  ),
};

/**
 * Props for `PrevNext`.
 */
export type PrevNextProps = SliceComponentProps<Content.PrevNextSlice>;

/**
 * Component for "PrevNext" Slices.
 */
const PrevNext = ({ slice }: PrevNextProps): JSX.Element => {
  return (
    <section className=" bg-white">
      <Bounded className="py-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex justify-between font-body">
            <div className="flex">
              <div className="scale-x-[-1] py-0 md:pt-1">
                <Arrow />
              </div>
              <Button
                field={slice.primary.previous_project_link}
                className="pl-2 pr-3"
              >
                <p>prev</p>
              </Button>
              <div className="py-0 hidden flex-wrap md:block md:pt-1">
                <>{slice.primary.previous_project_title}</>
              </div>
            </div>
            <div className="flex">
              <div className="py-0 hidden flex-wrap md:block md:pt-1">
                <>{slice.primary.next_project_title}</>
              </div>
              <Button
                field={slice.primary.next_project_link}
                className="pl-3 pr-2"
              >
                <p>next</p>
              </Button>

              <div className="py-0 md:pt-1">
                <Arrow />
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default PrevNext;
