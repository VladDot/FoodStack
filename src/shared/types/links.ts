export type LinkItem = {
    href: string;
    label: string;
    activeByPrefix?: boolean;
};

export interface NavigationProps {
    isOpen?: boolean;
    burger?: boolean;
    links: LinkItem[];
    navClass?: string;
    setIsOpen?: (isOpen: boolean) => void;
}
