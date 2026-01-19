"use client";

import { HeaderProfile, LanguageSwitcher, Logo, Navigation } from "@/shared/ui";

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
        <header className="w-full bg-linear-to-r from-lime-300 to-emerald-500 text-white z-999 fixed top-0 left-0">
            <div className="container-app flex justify-between items-center gap-6">
                {children}
            </div>
        </header>
    );
};

Header.Logo = Logo;
Header.Navigation = Navigation;
Header.HeaderProfile = HeaderProfile;
Header.LanguageSwitcher = LanguageSwitcher;
