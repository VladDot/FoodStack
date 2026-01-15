import { ChildrenProps } from "@/types";
import { HeaderWrapper } from "@/widgets";

export default function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
            <HeaderWrapper />
            <main className="grow mt-16">{children}</main>
            <footer>footer</footer>
        </div>
    );
}
