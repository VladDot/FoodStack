"use client";

import { usePathname } from "next/navigation";

import { LinkButton } from "@/shared/ui";
import { routes } from "@/shared/constants";

export const WrapperForm = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const locale = pathname?.split("/")[1];

    return (
        <div className=" flex flex-col w-full max-w-[600px] p-2 md:p-6">
            <div className="flex gap-2 justify-between ">
                <LinkButton
                    variant="ghost"
                    href={routes.auth.signIn}
                    isActive={pathname === `/${locale}${routes.auth.signIn}`}
                >
                    Login
                </LinkButton>

                <LinkButton
                    variant="ghost"
                    href={routes.auth.signUp}
                    isActive={pathname === `/${locale}${routes.auth.signUp}`}
                >
                    Register
                </LinkButton>
            </div>
            <div className="bg-white  rounded-md py-12 px-4 md:px-8  shadow-md flex flex-col gap-10">
                <div className="flex flex-col gap-8">{children}</div>
            </div>
        </div>
    );
};
