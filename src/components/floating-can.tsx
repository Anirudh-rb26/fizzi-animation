"use client"

import React, { forwardRef, ReactNode } from 'react'
import { SodaCan, SodaCanProps } from './soda-can'
import { Float } from "@react-three/drei"
import { Group } from 'three'

type FloatingCanProps = {
    flavour?: SodaCanProps["flavor"];
    floatSpeed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
    floatingRange?: [number, number];
    children?: ReactNode;
}

const FloatingCan = forwardRef<Group, FloatingCanProps>(
    ({
        flavour = "blackCherry",
        floatSpeed = 1.5,
        rotationIntensity = 1,
        floatIntensity = 1,
        floatingRange = [-0.1, 0.1],
        children,
        ...props
    }, ref) => {
        return (
            <group ref={ref} {...props}>
                <Float
                    speed={floatSpeed}
                    rotationIntensity={rotationIntensity}
                    floatIntensity={floatIntensity}
                    floatingRange={floatingRange}>
                    <SodaCan flavor={flavour}></SodaCan>
                </Float>
            </group>
        )
    })

FloatingCan.displayName = "FloatingCank"

export default FloatingCan