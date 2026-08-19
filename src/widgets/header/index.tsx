"use client";

import { ChildrenProps } from "@/shared/types";
import { Logo, Navigation } from "@/shared/ui";
import { HeaderProfile } from "@/shared/ui/auth";
import { LanguageSwitcher } from "@/features/general";

type HeaderComponent = React.FC<ChildrenProps> & {
    Logo: typeof Logo;
    Navigation: typeof Navigation;
    HeaderProfile: typeof HeaderProfile;
    LanguageSwitcher: typeof LanguageSwitcher;
};

export const Header: HeaderComponent = ({ children }: ChildrenProps) => {
    return (
        <header className="sticky top-0 left-0 w-full bg-green-200 z-999 border-b border-[#BFDCC4] shadow-sm h-(--header-h)">
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
