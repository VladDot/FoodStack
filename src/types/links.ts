export type LinkItem = {
    href: string;
    label: string;
};

export interface NavigationProps {
    links: LinkItem[];
    navClass?: string;
}
