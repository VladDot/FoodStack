import { ChildrenProps } from "@/shared/types";

export default async function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex flex-1 flex-col  ">
            <main className="grow container-app ">{children}</main>
            <footer>footer</footer>
        </div>
    );
}
