import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp className={clsx("px-7 md:px-6", className)} {...restProps}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
{
  /*took out of clsx: py-8 md:py-8 lg:py-8 */
}
