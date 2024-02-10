'use client'

import { Image } from "@nextui-org/react";

interface Props {
    src?: string
    width?: number,
    height?: number
}

export default function SVGImage({ src, width, height }: Props) {
    return (
        <Image
            width={width}
            height={height}
            src={src}
        />
    );
}