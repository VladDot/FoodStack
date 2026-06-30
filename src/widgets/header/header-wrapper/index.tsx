"use client";

import { useSession } from "next-auth/react";
import { Burger, ResponseWrapper } from "@/shared/ui";

import { Header } from "..";
import { mainLinks } from "../mock";
import { HeaderAction } from "../header-action";

export const HeaderWrapper = ({}) => {
    const { data: session } = useSession();
    const isLoggedIn = !!session;
    return (
        <Header>
            <Header.Logo />
            <ResponseWrapper endpoint="isTablet">
                <Header.Navigation links={mainLinks} />
                <div className="hidden sm:flex laptop:gap-12 items-center font-scada tablet:gap-6 px-2">
                    <HeaderAction isLoggedIn={isLoggedIn} />
                    <Header.LanguageSwitcher />
                </div>
            </ResponseWrapper>

            <div className="flex gap-10 items-center tablet:hidden">
                <ResponseWrapper endpoint="isMobile">
                    <HeaderAction className="hidden sm:flex gap-10 items-center font-scada px-2" isLoggedIn={isLoggedIn} />
                    <div className="flex gap-6  items-center ">
                        <Header.LanguageSwitcher />
                        <Burger />
                    </div>
                </ResponseWrapper>
            </div>
        </Header>
    );
};
