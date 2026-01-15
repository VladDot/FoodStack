import { Navigation } from "@/shared/ui";
import { mainLinks } from "../mock";

export const HeaderBurgerMenu = ({}) => {
    return (
        <div className=" border border-gray-300 h-full flex align-center">
            <Navigation
                links={mainLinks}
                navClass="flex flex-col gap-y-4 w-full my-auto  -translate-y-20"
            />
        </div>
    );
};
