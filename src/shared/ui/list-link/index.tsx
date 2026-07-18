"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buildLocalPath } from "@/shared/utils";

import { getStyles } from "./styles";

interface IListLink {
    href: string;
    label: string;
    locale: string;
    burger?: boolean;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export const ListLink = ({
    href,
    label,
    burger,
    locale,
    isOpen,
    setIsOpen,
}: IListLink) => {
    const pathname = usePathname();
    const localHref = buildLocalPath(locale, href);
    const isActive = pathname === localHref;
    const { link } = getStyles({ burger, isOpen, isActive });

    return (
        <li>
            <Link
                className={link}
                onClick={() => setIsOpen?.(false)}
                href={localHref}
            >
                {label}
            </Link>
        </li>
    );
};
