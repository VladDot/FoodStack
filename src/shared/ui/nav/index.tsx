import { useLocale } from "next-intl";

import { NavigationProps } from "@/types";

import { getStyles } from "./styles";
import { ListLink } from "../list-link";

export const Navigation = ({ links, navClass }: NavigationProps) => {
    const locale = useLocale();
    const { ul } = getStyles({ navClass });

    return (
        <ul className={ul}>
            {links.map(({ label, href }, idx) => (
                <ListLink
                    href={href}
                    label={label}
                    locale={locale}
                    key={`nav_${label}_${idx}`}
                />
            ))}
        </ul>
    );
};
