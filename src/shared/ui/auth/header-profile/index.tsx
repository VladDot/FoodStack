"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ExitIcon } from "@/shared/assets/icons";

export const HeaderProfile = ({}) => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange" />
                <span className="text-sm font-medium hidden laptop:block">
                    {session?.user?.email}
                </span>
            </div>
            <button
                onClick={handleSignOut}
                className="text-sm hover:opacity-70 transition-opacity"
            >
                <ExitIcon className="w-5 h-5" />
            </button>
        </div>
    );
};
