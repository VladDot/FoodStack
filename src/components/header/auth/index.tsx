"use client";

export const HeaderProfile = ({}) => {
    return (
        <div className="flex items-center gap-2">
            {/* <Avatar
                src={avatar ? avatar :  DefaultAvatar}
                alt={name}
                className="w-8 h-8 rounded-full"
            /> */}
            <div className="w-8 h-8 rounded-full bg-amber-700" />
            <button
                onClick={() => console.log("logout")}
                className="text-sm"
            >
                Logout
            </button>
        </div>
    );
};
