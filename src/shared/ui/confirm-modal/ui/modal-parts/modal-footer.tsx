import { ChildrenProps } from "@/shared/types";

export const ModalFooter = ({ children }: ChildrenProps) => {
    return <div className="flex  gap-2 justify-between">{children}</div>;
};
