import Link from "next/link";

import { links } from "./mock";

interface INavigation {
    d: string;
}

export const Navigation = ({}: INavigation) => {
    return (
        <ul>
            {links.map(({ label, href }, idx) => (
                <Link
                    href={href}
                    key={`nav_${label}_${idx}`}
                >
                    {label}
                </Link>
            ))}
        </ul>
    );
};
