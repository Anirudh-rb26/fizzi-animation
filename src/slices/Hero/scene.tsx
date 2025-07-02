"use client"

import React, { useRef } from 'react'
import { Environment } from "@react-three/drei"
import FloatingCan from '@/components/floating-can'
import { Group } from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useStore } from '@/app/hooks/useStore'

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {}

function Scene({ }: Props) {
    const isReady = useStore((state) => state.isReady);

    const firstCanRef = useRef<Group>(null)
    const secondCanRef = useRef<Group>(null)
    const thirdCanRef = useRef<Group>(null)
    const fourthCanRef = useRef<Group>(null)
    const fifthCanRef = useRef<Group>(null)

    const firstCanGroupRef = useRef<Group>(null)
    const secondCanGroupRef = useRef<Group>(null)

    const groupRef = useRef<Group>(null)

    const FLOAT_SPEED = 1.5;

    useGSAP(() => {
        if (!firstCanRef.current ||
            !secondCanRef.current ||
            !thirdCanRef.current ||
            !fourthCanRef.current ||
            !fifthCanRef.current ||
            !firstCanGroupRef.current ||
            !secondCanGroupRef.current ||
            !groupRef.current) return;

        isReady();

        // Initial Position of First Can
        gsap.set(firstCanRef.current.position, { x: 1.5 })
        gsap.set(firstCanRef.current.rotation, { z: 0.5 })

        // Initial Position of Second Can
        gsap.set(secondCanRef.current.position, { x: -1.5 })
        gsap.set(secondCanRef.current.rotation, { z: -0.5 })

        // Hiding the rest of the Cans
        gsap.set(thirdCanRef.current.position, { y: 5, z: 2 })
        gsap.set(fourthCanRef.current.position, { x: 2, y: 4, z: 2 })
        gsap.set(fifthCanRef.current.position, { y: -5 })

        const introductionTimeLine = gsap.timeline({
            defaults: {
                duration: 3,
                ease: "back.out(1.4)"
            }
        })

        if (window.scrollY < 20) {
            introductionTimeLine
                .from(firstCanGroupRef.current.position, { y: -5, x: 1 }, 0)
                .from(firstCanGroupRef.current.rotation, { z: 3 }, 0)
                .from(secondCanGroupRef.current.position, { y: -5, x: 1 }, 0)
                .from(secondCanGroupRef.current.rotation, { z: 3 }, 0)
        }


        const scrollingTimeLine = gsap.timeline({
            defaults: {
                duration: 2,
            },
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });

        scrollingTimeLine
            .to(groupRef.current.rotation, { y: Math.PI * 2 })

            .to(firstCanRef.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
            .to(firstCanRef.current.rotation, { z: 0.3 }, 0)

            .to(secondCanRef.current.position, { x: 1, y: -0.2, z: -1 }, 0)
            .to(secondCanRef.current.rotation, { z: 0 }, 0)

            .to(thirdCanRef.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
            .to(thirdCanRef.current.rotation, { z: -0.1 }, 0)

            .to(fourthCanRef.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
            .to(fourthCanRef.current.rotation, { z: 0.3 }, 0)

            .to(fifthCanRef.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
            .to(fifthCanRef.current.rotation, { z: -0.25 }, 0)

            .to(groupRef.current.position, { x: 1, duration: 3, ease: "sine.out" }, 1.3)
    })

    return (
        <group ref={groupRef}>
            <group ref={firstCanGroupRef}>
                <FloatingCan ref={firstCanRef} flavour='strawberryLemonade' floatSpeed={FLOAT_SPEED}></FloatingCan>
            </group>
            <group ref={secondCanGroupRef}>
                <FloatingCan ref={secondCanRef} flavour='lemonLime' floatSpeed={FLOAT_SPEED}></FloatingCan>
            </group>
            <FloatingCan ref={thirdCanRef} flavour='watermelon' floatSpeed={FLOAT_SPEED}></FloatingCan>
            <FloatingCan ref={fourthCanRef} flavour='blackCherry' floatSpeed={FLOAT_SPEED}></FloatingCan>
            <FloatingCan ref={fifthCanRef} flavour='grape' floatSpeed={FLOAT_SPEED}></FloatingCan>
            <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5}></Environment>
        </group>
    )
}

export default Scene