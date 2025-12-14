import Link from "next/link";

import { links } from "./mock";
import { useLocale } from "next-intl";

export const withLocale = (locale: string, path: string) => `/${locale}${path}`;

export const Navigation = () => {
    const locale = useLocale();

    return (
        <ul>
            {links.map(({ label, href }, idx) => (
                <li key={`nav_${label}_${idx}`}>
                    <Link href={withLocale(locale, href)}>{label}</Link>
                </li>
            ))}
        </ul>
    );
};
