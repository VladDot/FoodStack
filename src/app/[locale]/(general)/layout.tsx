import { ChildrenProps } from "@/shared/types";

export default async function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
            <main className="grow container-app">{children}</main>
            <footer>footer</footer>
        </div>
    );
}
