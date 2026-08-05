"use client";

import { useState, useEffect } from "react";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "../button";

interface ScrollToTopProps {
    threshold?: number;
}

export const ScrollToTop = ({ threshold = 300 }: ScrollToTopProps) => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            setIsVisible(window.scrollY > threshold);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname, threshold]);

    if (!isVisible) return null;

    return (
        <Button
            size="icon"
            variant="cta"
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <ArrowUp className="size-5" />
        </Button>
    );
};
