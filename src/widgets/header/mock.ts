import { LinkItem } from "@/shared/types";
import { routes } from "@/shared/constants";

export const mainLinks: LinkItem[] = [
    { href: routes.general.home, label: "Home" },
    { href: routes.general.info, label: "Info" },
    { href: routes.general.contact, label: "Contact" },
    { href: routes.general.premium, label: "Premium" },
    { href: routes.general.foodsSearch, label: "Foods Search" },
    { href: routes.general.recipes, label: "Recipes" },
];

export const dashboardLink: LinkItem = {
    label: "Dashboard",
    activeByPrefix: true,
    href: routes.user.dashboard.main,
};

export const authLinks: LinkItem[] = [
    { href: routes.auth.signIn, label: "Sign-in" },
    { href: routes.auth.signUp, label: "Sign-up" },
];
