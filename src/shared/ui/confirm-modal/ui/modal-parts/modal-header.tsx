import { ChildrenProps } from "@/shared/types";

export const ModalHeader = ({ children }: ChildrenProps) => {
    return <div className="text-2xl text-brand-dark/80">{children}</div>;
};
