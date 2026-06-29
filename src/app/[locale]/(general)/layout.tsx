import { auth } from "@/shared/lib/auth";
import { HeaderWrapper } from "@/widgets";
import { ChildrenProps } from "@/shared/types";

export default async function Layout({ children }: ChildrenProps) {
    const session = await auth();

    return (
        <div className="scroll-blue flex h-screen flex-col overflow-y-auto">
            <HeaderWrapper isLoggedIn={!!session} />
            <main className="grow container-app">{children}</main>
            <footer>footer</footer>
        </div>
    );
}
