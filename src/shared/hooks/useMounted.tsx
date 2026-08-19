"use client";
import { useEffect, useState } from "react";

interface IMountedProps {
    isOpened: boolean;
    duration?: number;
}

export const useMounted = ({ isOpened, duration = 300 }: IMountedProps) => {
    const [isUnmounted, setIsUnmounted] = useState<boolean>(false);

    if (isOpened && !isUnmounted) {
        setIsUnmounted(true);
    }

    useEffect(() => {
        if (!isOpened && isUnmounted) {
            const timeout = setTimeout(() => {
                setIsUnmounted(false);
            }, duration);

            return () => clearTimeout(timeout);
        }
    }, [isOpened, duration, isUnmounted]);

    return { isUnmounted };
};
