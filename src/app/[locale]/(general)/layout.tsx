import { Header } from "@/components";
import { ChildrenProps } from "@/types";

export default function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
            <Header />
            <main className="grow">{children}</main>
            <footer>footer</footer>
        </div>
    );
}
