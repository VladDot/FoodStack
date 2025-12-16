"use client";

import { authLinks, mainLinks } from "@/components/header-wrapper/mock";

import { Header } from "../header";

export const HeaderWrapper = () => {
    const user = true;

    return (
        <Header>
            <Header.Logo />
            <Header.Navigation links={mainLinks} />
            <div className="flex gap-8">
                {user ? (
                    <Header.Navigation links={authLinks} />
                ) : (
                    <Header.HeaderProfile />
                )}
                <Header.LanguageSwitcher />
            </div>
        </Header>
    );
};
