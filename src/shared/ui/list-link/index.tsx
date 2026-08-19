"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { buildLocalPath } from "@/shared/utils";

import { getStyles } from "./styles";

interface IListLink {
    href: string;
    label: string;
    locale: string;
    burger?: boolean;
    isOpen?: boolean;
    icon?: LucideIcon;
    activeByPrefix?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export const ListLink = ({
    href,
    label,
    burger,
    locale,
    isOpen,
    setIsOpen,
    icon: Icon,
    activeByPrefix,
}: IListLink) => {
    const pathname = usePathname();
    const localHref = buildLocalPath(locale, href);
    const isActive = activeByPrefix
        ? !!pathname &&
          (pathname === localHref || pathname.startsWith(`${localHref}/`))
        : pathname === localHref;
    const { link } = getStyles({ burger, isOpen, isActive });

    return (
        <li>
            <Link
                className={link}
                href={localHref}
                onClick={() => setIsOpen?.(false)}
            >
                {Icon && <Icon className="h-5 w-5" />}
                {label}
            </Link>
        </li>
    );
};
