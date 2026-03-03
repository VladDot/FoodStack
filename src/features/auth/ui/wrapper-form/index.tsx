import { routes } from "@/shared/constants";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { usePathname } from "next/navigation";

export const WrapperForm = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div className=" flex flex-col w-full max-w-[600px] p-2 md:p-6">
            <div className="flex justify-between ">
                <Button
                    isActive={pathname === routes.general.login}
                    variant="ghost"
                    asChild
                >
                    <Link href={routes.general.login}>Login</Link>
                </Button>
                <Button
                    isActive={pathname === routes.general.register}
                    variant="ghost"
                    asChild
                >
                    <Link href={routes.general.register}>Register</Link>
                </Button>
            </div>
            <div className="bg-white  rounded-md py-12 px-4 md:px-8  shadow-md flex flex-col gap-10">
                <div className="flex flex-col gap-8"> {children}</div>
            </div>
        </div>
    );
};
