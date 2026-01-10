import { ChildrenProps } from "@/types";

export default function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
            <main className="grow">{children}</main>
        </div>
    );
}
