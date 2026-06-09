import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { routes } from "@/shared/constants";

export const WrapperForm = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className=" flex flex-col w-full max-w-[600px] p-2 md:p-6">
            <div className="flex gap-2 justify-between ">
                <Button
                    asChild
                    variant="ghost"
                    isActive={pathname === routes.auth.signIn}
                >
                    <Link href={routes.auth.signIn}>Login</Link>
                </Button>
                <Button
                    asChild
                    variant="ghost"
                    isActive={pathname === routes.auth.signUp}
                >
                    <Link href={routes.auth.signUp}>Register</Link>
                </Button>
            </div>
            <div className="bg-white  rounded-md py-12 px-4 md:px-8  shadow-md flex flex-col gap-10">
                <div className="flex flex-col gap-8">{children}</div>
            </div>
        </div>
    );
};
