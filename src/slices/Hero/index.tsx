"use client"

import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/bounded";
import ShopButton from "@/components/shop-button";
import { TextSplitter } from "@/components/TextSplitter";
import { View } from "@react-three/drei"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene from "./scene";
import { Bubbles } from "@/components/bubbles";

import { useStore } from "@/app/hooks/useStore";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(() => {
    if (!ready && isDesktop) return;

    const introductionTimeline = gsap.timeline();

    introductionTimeline
      .set(".hero", {
        opacity: 1
      })
      .from(".hero-header-word", {
        scale: 3, opacity: 0,
        ease: "power4.in", delay: 0.3, stagger: 1
      })
      .from(".hero-subheading", {
        opacity: 0, y: 30
      }, "+=0.8")
      .from(".hero-body", {
        opacity: 0, y: 10,
      })
      .from(".hero-button", {
        opacity: 0, y: 10, duration: 0.6,
      });


    const scrollTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    scrollTimeLine.fromTo("body", {
      backgroundColor: "#FDE047",
    }, {
      backgroundColor: "#D9F99D",
      overwrite: "auto",
    }, 1).from(".text-side-heading .split-char", {
      scale: 1.3, y: 40, rotate: -25,
      opacity: 0, stagger: 0.1, ease: "back.out(3)"
    }).from(".text-side-body", {
      y: 20, opacity: 0,
    });
  }, { dependencies: [ready] });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[0.8] text-orange-500 md:text-[9rem]">
              <TextSplitter text={asText(slice.primary.heading)} wordDisplayStyle="block" className="hero-header-word"></TextSplitter>
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <ShopButton buttonLink={slice.primary.button_link} buttonText={slice.primary.button_text} classname="hero-button mt-12"></ShopButton>
          </div>
        </div>
        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage className="md:hidden w-full" field={slice.primary.cans_image} />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)}></TextSplitter>
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
