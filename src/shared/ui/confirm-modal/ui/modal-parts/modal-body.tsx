import { ChildrenProps } from "@/shared/types";

export const ModalBody = ({ children }: ChildrenProps) => {
    return <div className="text-md text-gray-600">{children}</div>;
};
