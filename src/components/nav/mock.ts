import { routes } from "@/constants";

type LinkItem = {
    href: string;
    label: string;
};

export const links: LinkItem[] = [
    { href: routes.general.info, label: "Info" },
    { href: routes.general.login, label: "Sing-in" },
    { href: routes.general.contact, label: "Contact" },
    { href: routes.marketing.premium, label: "Premium" },
    { href: routes.general.register, label: "Sing-up" },
];
