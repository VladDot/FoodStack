import Link from "next/link";

import { buildLocalPath } from "@/utils";

import { getStyles } from "./styles";

interface IListLink {
    href: string;
    label: string;
    locale: string;
}

export const ListLink = ({ locale, href, label }: IListLink) => {
    const { link } = getStyles();
    return (
        <li>
            <Link
                href={buildLocalPath(locale, href)}
                className={link}
            >
                {label}
            </Link>
        </li>
    );
};
