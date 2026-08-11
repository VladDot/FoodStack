"use client";

import { useState } from "react";

import { Loader } from "lucide-react";
import Image, { type ImageProps } from "next/image";

import { cn } from "@/shared/utils";

interface SkeletonImageProps extends Omit<ImageProps, "className"> {
    className?: string;
    skeletonClassName?: string;
}

export const SkeletonImage = ({
    alt,
    onLoad,
    onError,
    className,
    skeletonClassName,
    ...props
}: SkeletonImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleRef = (img: HTMLImageElement | null) => {
        if (img && img.complete && img.naturalWidth > 0) {
            setIsLoaded(true);
        }
    };

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {!isLoaded && (
                <div
                    aria-hidden
                    className={cn(
                        "absolute inset-0 z-10 flex items-center justify-center animate-pulse bg-neutral-200",
                        skeletonClassName,
                    )}
                >
                    <Loader className="size-8 animate-spin text-zinc-400" />
                </div>
            )}
            <Image
                {...props}
                alt={alt}
                ref={handleRef}
                onLoad={(event) => {
                    setIsLoaded(true);
                    onLoad?.(event);
                }}
                onError={(event) => {
                    setIsLoaded(true);
                    onError?.(event);
                }}
                className="w-full h-full object-cover"
            />
        </div>
    );
};
