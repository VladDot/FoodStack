import { useRef } from "react";

import { useOutsideClick } from "@/shared/hooks";

interface IConfirmModal {
    isOpen?: boolean;
    children?: React.ReactNode;
    setIsOpen: (isOpen: boolean) => void;
}

export const ConfirmModal = ({
    children,
    isOpen,
    setIsOpen,
}: IConfirmModal) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(() => setIsOpen(false), ref);

    console.log(isOpen);

    return (
        <>
            {isOpen && (
                <div className="w-80 flex flex-col m-auto p-2 absolute top-20% right-50% z-999 bg-white rounded-md shadow-md">
                    {children}
                </div>
            )}
        </>
    );
};
