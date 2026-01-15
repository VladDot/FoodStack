"use client";

import { Burger, ResponseWrapper } from "@/shared/ui";

import { Header } from "..";
import { mainLinks } from "../mock";
import { HeaderAction } from "../header-action";
import { HeaderBurgerMenu } from "../header-burger-menu";

export const HeaderWrapper = () => {
    return (
        <Header>
            <Header.Logo />
            <ResponseWrapper endpoint="isTablet">
                <Header.Navigation links={mainLinks} />
                <div className="hidden sm:flex laptop:gap-12 items-center font-scada tablet:gap-6 px-2">
                    <HeaderAction />
                    <Header.LanguageSwitcher />
                </div>
            </ResponseWrapper>

            <div className="flex gap-10 items-center tablet:hidden">
                <ResponseWrapper endpoint="isMobile">
                    <HeaderAction className="hidden sm:flex gap-10 items-center font-scada px-2" />
                </ResponseWrapper>
                <ResponseWrapper endpoint="isMobile">
                    <div className="flex gap-6  items-center ">
                        <Header.LanguageSwitcher />
                        <Burger>
                            <HeaderBurgerMenu />
                        </Burger>
                    </div>
                </ResponseWrapper>
            </div>
        </Header>
    );
};
