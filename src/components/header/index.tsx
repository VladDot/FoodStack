"use client";

import { Logo } from "./logo";
import { Navigation } from "./nav";
import { HeaderProfile } from "./auth";
import { LanguageSwitcher } from "./language-switcher";

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
    return <header className="flex justify-between w-full">{children}</header>;
};

Header.Logo = Logo;
Header.Navigation = Navigation;
Header.HeaderProfile = HeaderProfile;
Header.LanguageSwitcher = LanguageSwitcher;
