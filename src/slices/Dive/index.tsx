"use client"

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/bounded";
import Scene from "./scene";
import { View } from "@react-three/drei"

/**
 * Props for `Dive`.
 */
export type DiveProps = SliceComponentProps<Content.DiveSlice>;

/**
 * Component for "Dive" Slices.
 */
const Dive: FC<DiveProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="sr-only">{slice.primary.sentence}</h2>
      <View className="h-screen w-screen">
        <Scene flavor={slice.primary.flavor} sentence={slice.primary.sentence} />
      </View>
    </Bounded>
  );
};

export default Dive;
