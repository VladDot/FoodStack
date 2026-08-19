"use client";

import { useSession } from "next-auth/react";

import { Burger } from "@/shared/ui";

import { Header } from "..";
import { HeaderAction } from "../header-action";
import { mainLinks, dashboardLink } from "../mock";

export const HeaderWrapper = ({}) => {
    const { data: session } = useSession();
    const isLoggedIn = !!session;
    const links = isLoggedIn ? [...mainLinks, dashboardLink] : mainLinks;

    return (
        <Header>
            <Header.Logo />

            <div className="hidden laptop:flex flex-1 justify-center">
                <Header.Navigation links={links} />
            </div>

            <div className="hidden laptop:flex items-center gap-6 laptop:gap-12 font-scada">
                <HeaderAction isLoggedIn={isLoggedIn} />
                <Header.LanguageSwitcher />
            </div>

            <div className="flex laptop:hidden items-center gap-6">
                <HeaderAction
                    className="hidden sm:flex"
                    isLoggedIn={isLoggedIn}
                />
                <Header.LanguageSwitcher />
                <Burger links={links} />
            </div>
        </Header>
    );
};
