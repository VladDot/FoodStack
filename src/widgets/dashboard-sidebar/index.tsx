"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/utils";
import { buildLocalPath } from "@/shared/utils";

import { dashboardLinks } from "./mock";

export const DashboardSidebar = () => {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <aside className="shrink-0 border-r border-brand-gray/20 bg-white p-4">
            <nav>
                <ul className="flex gap-2 laptop:flex-col">
                    {dashboardLinks.map(({ href, label, icon: Icon }) => {
                        const localHref = buildLocalPath(locale, href);
                        const isActive = pathname === localHref;

                        return (
                            <li key={href}>
                                <Link
                                    href={localHref}
                                    className={cn(
                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-brand-teal/10 text-brand-teal"
                                            : "text-brand-forest/70 hover:bg-brand-teal/5 hover:text-brand-forest",
                                    )}
                                >
                                    {Icon && <Icon className="h-5 w-5" />}
                                    <span className="hidden laptop:inline">
                                        {label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};