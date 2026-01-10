"use client";
import { useEffect, useState } from "react";

interface IUseMounted {
    isOpened: boolean;
    duration?: number;
}

export const useMounted = ({ isOpened, duration = 300 }: IUseMounted) => {
    const [isMounted, setIsMounted] = useState(isOpened);

    if (isOpened && !isMounted) {
        setIsMounted(true);
    }

    useEffect(() => {
        if (!isOpened && isMounted) {
            const timeout = setTimeout(() => {
                setIsMounted(false);
            }, duration);

            return () => clearTimeout(timeout);
        }
    }, [isOpened, duration, isMounted]);

    return  isMounted ;
};
