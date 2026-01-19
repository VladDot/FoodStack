export type LinkItem = {
    href: string;
    label: string;
};

export interface NavigationProps {
    isOpen?: boolean;
    burger?: boolean;
    links: LinkItem[];
    navClass?: string;
    setIsOpen?: (isOpen: boolean) => void;
}
