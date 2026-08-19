import {
    Bookmark,
    Settings,
    LineChart,
    CalendarDays,
    MessageCircle,
    LayoutDashboard,
    type LucideIcon,
} from "lucide-react";

import { LinkItem } from "@/shared/types";
import { routes } from "@/shared/constants";

export const dashboardLinks: (LinkItem & { icon: LucideIcon })[] = [
    {
        href: routes.user.dashboard.main,
        label: "Головна",
        icon: LayoutDashboard,
    },
    {
        href: routes.user.dashboard.diary,
        label: "Щоденник",
        icon: CalendarDays,
    },
    {
        href: routes.user.dashboard.saved,
        label: "Збережені",
        icon: Bookmark,
    },
    {
        href: routes.user.dashboard.chat,
        label: "Чат",
        icon: MessageCircle,
    },
    {
        href: routes.user.dashboard.progress,
        label: "Прогрес",
        icon: LineChart,
    },
    {
        href: routes.user.dashboard.settings,
        label: "Налаштування",
        icon: Settings,
    },
];
