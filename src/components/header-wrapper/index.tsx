"use client";

import { authLinks, mainLinks } from "@/components/header-wrapper/mock";

import { Header } from "../header";
import { ResponseWrapper } from "../response-wrapper";
import { Burger } from "../burger";

export const HeaderWrapper = () => {
    const user = true;

    return (
        <Header>
            <Header.Logo />
            <ResponseWrapper endpoint="isLaptop">
                <Header.Navigation links={mainLinks} />
            </ResponseWrapper>

            <div
                className={
                    "flex gap-10 items-center font-scada tablet:gap-15 px-2 "
                }
            >
                {user ? (
                    <Header.Navigation links={authLinks} />
                ) : (
                    <Header.HeaderProfile />
                )}
                <Header.LanguageSwitcher />
            </div>

            <ResponseWrapper endpoint="isMobile">
                <Burger />
            </ResponseWrapper>
        </Header>
    );
};
