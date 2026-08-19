import { ChildrenProps } from "@/shared/types";
import { DashboardSidebar } from "@/widgets";

export default function Layout({ children }: ChildrenProps) {
    return (
        <div className="scroll-blue flex flex-1 flex-col bg-amber-400">
            <div className="flex flex-1">
                <DashboardSidebar />
                <main className="grow overflow-x-auto p-6">{children}</main>
            </div>
        </div>
    );
}