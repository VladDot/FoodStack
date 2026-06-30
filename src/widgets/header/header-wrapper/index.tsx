"use client";

import { useSession } from "next-auth/react";

import { Burger } from "@/shared/ui";

import { Header } from "..";
import { mainLinks } from "../mock";
import { HeaderAction } from "../header-action";

export const HeaderWrapper = ({}) => {
    const { data: session } = useSession();
    const isLoggedIn = !!session;
    return (
        <Header>
            <Header.Logo />

            <div className="hidden laptop:flex flex-1 justify-center">
                <Header.Navigation links={mainLinks} />
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
                <Burger />
            </div>
        </Header>
    );
};
