import { ChildrenProps } from "@/shared/types";

export const ModalBody = ({ children }: ChildrenProps) => {
    return <div className="text-brand-dark/80">{children}</div>;
};
