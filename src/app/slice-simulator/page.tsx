import {
  SliceSimulator,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

type SliceSimulatorPageProps = {
  searchParams: Promise<{ state?: string }>;
};

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorPageProps) {
  const resolvedSearchParams = await searchParams;
  const slices = getSlices(resolvedSearchParams.state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
