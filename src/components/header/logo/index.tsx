import Link from "next/link";
import Image from "next/image";

import { routes } from "@/constants";
import { LogoIcon } from "@/assets/img";

interface ILogo {
    className?: string;
}

export const Logo = ({ className = "w-16 h-16" }: ILogo) => {
    return (
        <Link href={routes.general.home}>
            <Image
                alt="Logo"
                src={LogoIcon}
                className={className}
            />
        </Link>
    );
};
