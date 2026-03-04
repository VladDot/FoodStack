"use client";

import { LanguageSwitcher } from "@/features/general";
import { Logo, Navigation, HeaderProfile } from "@/shared/ui";

type HeaderProps = {
    children?: React.ReactNode;
};
type HeaderComponent = React.FC<HeaderProps> & {
    Logo: typeof Logo;
    Navigation: typeof Navigation;
    HeaderProfile: typeof HeaderProfile;
    LanguageSwitcher: typeof LanguageSwitcher;
};

export const Header: HeaderComponent = ({ children }: HeaderProps) => {
    return (
        <header className="fixed top-0 left-0 w-full text-white bg-linear-to-r from-lime-300 to-emerald-500 z-999">
            <div className="flex items-center justify-between gap-6 px-2 tablet:px-8">
                {children}
            </div>
        </header>
    );
};

Header.Logo = Logo;
Header.Navigation = Navigation;
Header.HeaderProfile = HeaderProfile;
Header.LanguageSwitcher = LanguageSwitcher;
