import { ChildrenProps } from "@/shared/types";

export default function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex flex-1 flex-col bg-amber-400">
            <main className="grow">{children}</main>
        </div>
    );
}
