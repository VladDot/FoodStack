import Link from "next/link";

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
    const { link } = getStyles({ burger, isOpen });

    return (
        <li>
            <Link
                className={link}
                onClick={() => setIsOpen?.(false)}
                href={buildLocalPath(locale, href)}
            >
                {label}
            </Link>
        </li>
    );
};
