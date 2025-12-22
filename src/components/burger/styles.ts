import clsx from "clsx";

interface IGetStyles {
    isOpen: boolean;
}

export const getStyles = ({ isOpen }: IGetStyles) => ({
    burger: clsx("", { "": isOpen, "": !isOpen }),
});
