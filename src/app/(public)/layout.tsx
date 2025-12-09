import { ChildrenProps } from "@/types";

export default function Layout({ children }: ChildrenProps) {
    <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
        <header>header</header>
        <main className="grow">{children}</main>
        <footer>footer</footer>
    </div>;
}
