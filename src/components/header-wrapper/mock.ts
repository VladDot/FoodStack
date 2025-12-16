import { LinkItem } from "@/types";
import { routes } from "@/constants";

export const mainLinks: LinkItem[] = [
    { href: routes.general.home, label: "Home" },
    { href: routes.general.info, label: "Info" },
    { href: routes.general.contact, label: "Contact" },
    { href: routes.general.premium, label: "Premium" },
];

export const authLinks: LinkItem[] = [
    { href: routes.general.login, label: "Sing-in" },
    { href: routes.general.register, label: "Sing-up" },
];
