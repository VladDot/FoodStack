"use client";

import { useSession } from "next-auth/react";

import { Header } from "..";
import { authLinks } from "../mock";

interface HeaderActionProps {
    className?: string;
}

export const HeaderAction = ({ className }: HeaderActionProps) => {
    const { data: session } = useSession();

    return (
        <div className={className}>
            {session ? (
                <Header.HeaderProfile />
            ) : (
                <Header.Navigation links={authLinks} />
            )}
        </div>
    );
};
