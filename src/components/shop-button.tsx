import { LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next';
import React from 'react'
import clsx from "clsx";

type ButtonProps = {
    buttonLink: LinkField;
    buttonText: string | null;
    classname?: string;
}

const ShopButton = ({ buttonLink, buttonText, classname }: ButtonProps) => {
    return (
        <PrismicNextLink
            className={clsx("rounded-xl bg-orange-500 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl", classname)}
            field={buttonLink}>
            {buttonText}
        </ PrismicNextLink>
    )
}

export default ShopButton