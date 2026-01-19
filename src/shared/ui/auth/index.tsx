"use client";

import { ExitIcon } from "@/assets/icons";

//TODO add avatar and user data

export const HeaderProfile = ({}) => {
    return (
        <div className="flex items-center gap-10">
            <div className="w-8 h-8 rounded-full bg-amber-700" />
            <button
                onClick={() => console.log("logout")}
                className="text-sm"
            >
                <ExitIcon className="w-5 h-5" />
            </button>
        </div>
    );
};
