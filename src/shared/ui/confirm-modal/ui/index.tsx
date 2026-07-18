import { useRef } from "react";

import { Overlay } from "@/shared/ui/overlay";
import { useOutsideClick } from "@/shared/hooks";

import { ModalBody, ModalFooter, ModalHeader } from "./modal-parts";

interface IConfirmModal {
    isOpen: boolean;
    children?: React.ReactNode;
    setIsOpen: (isOpen: boolean) => void;
}
type TConfirmModal = React.FC<IConfirmModal> & {
    ModalHeader: typeof ModalHeader;
    ModalBody: typeof ModalBody;
    ModalFooter: typeof ModalFooter;
};

export const ConfirmModal: TConfirmModal = ({
    isOpen,
    children,
    setIsOpen,
}: IConfirmModal) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useOutsideClick(() => setIsOpen(false), modalRef);

    return (
        <Overlay isOpen={isOpen}>
            <div className="flex items-center justify-center min-h-screen ">
                <div
                    ref={modalRef}
                    className="w-100 bg-brand-bg -translate-y-16  flex flex-col gap-8 p-8 shadow-md border border-brand-green/20 rounded-md"
                >
                    {children}
                </div>
            </div>
        </Overlay>
    );
};

ConfirmModal.ModalHeader = ModalHeader;
ConfirmModal.ModalBody = ModalBody;
ConfirmModal.ModalFooter = ModalFooter;
