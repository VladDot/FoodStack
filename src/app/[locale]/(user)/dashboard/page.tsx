import {
    Plus,
    Flame,
    Bookmark,
    Droplets,
    Utensils,
    LineChart,
    CalendarDays,
    CheckCircle2,
} from "lucide-react";

import { routes } from "@/shared/constants";
import { LinkButton, MacroCards, CaloriesDisplay } from "@/shared/ui";

const statCards = [
    {
        label: "Калорії",
        value: 1420,
        unit: "kcal",
        target: "з 2000",
        icon: Flame,
        iconClass: "bg-brand-orange/10 text-brand-orange",
    },
    {
        label: "Білки",
        value: 86,
        unit: "г",
        target: "з 120г",
        icon: Utensils,
        iconClass: "bg-green-100 text-green-600",
    },
    {
        label: "Вуглеводи",
        value: 150,
        unit: "г",
        target: "з 250г",
        icon: LineChart,
        iconClass: "bg-amber-100 text-amber-600",
    },
    {
        label: "Вода",
        value: 1.4,
        unit: "л",
        target: "з 2.5л",
        icon: Droplets,
        iconClass: "bg-sky-100 text-sky-600",
    },
];

const quickActions = [
    {
        label: "Додати прийом їжі",
        description: "Зафіксувати сніданок, обід чи вечерю",
        href: routes.user.dashboard.diary,
        icon: Plus,
        iconClass: "bg-brand-teal/10 text-brand-teal",
    },
    {
        label: "Пошук рецептів",
        description: "Знайти нову страву до раціону",
        href: routes.general.recipes,
        icon: Bookmark,
        iconClass: "bg-brand-orange/10 text-brand-orange",
    },
    {
        label: "Мій прогрес",
        description: "Статистика та динаміка за тиждень",
        href: routes.user.dashboard.progress,
        icon: CalendarDays,
        iconClass: "bg-green-100 text-green-600",
    },
];

const todayMeals = [
    { name: "Сніданок", time: "08:30", kcal: 420, done: true },
    { name: "Обід", time: "13:00", kcal: 620, done: true },
    { name: "Вечеря", time: "19:00", kcal: 380, done: false },
];

function DashboardPage({}) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark">
                        Ласкаво просимо!
                    </h1>
                    <p className="text-sm text-brand-forest/60">
                        Понеділок, 19 серпня — огляд твого дня
                    </p>
                </div>
                <LinkButton
                    href={routes.user.dashboard.diary}
                    variant="cta"
                    className="w-auto rounded-full px-6"
                >
                    + Додати до щоденника
                </LinkButton>
            </div>

            <div className="grid grid-cols-2 gap-4 laptop:grid-cols-4">
                {statCards.map(
                    ({ label, value, unit, target, icon: Icon, iconClass }) => (
                        <div
                            key={label}
                            className="flex flex-col gap-3 rounded-xl border border-brand-gray/20 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-brand-forest/70">
                                    {label}
                                </span>
                                <span
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-brand-dark">
                                {value}
                                <span className="ml-1 text-sm font-medium text-brand-forest/50">
                                    {unit}
                                </span>
                            </p>
                            <span className="text-xs text-brand-forest/50">
                                {target}
                            </span>
                        </div>
                    ),
                )}
            </div>

            <div className="grid gap-4 laptop:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-xl border border-brand-gray/20 bg-white p-5 shadow-sm laptop:col-span-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                            Прийоми їжі сьогодні
                        </h2>
                        <LinkButton
                            href={routes.user.dashboard.diary}
                            size="sm"
                            variant="ghost"
                            className="w-auto"
                        >
                            Усі записи →
                        </LinkButton>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {todayMeals.map(({ name, time, kcal, done }) => (
                            <li
                                key={name}
                                className="flex items-center justify-between gap-3 rounded-lg border border-brand-gray/10 px-3 py-2.5"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle2
                                        className={`h-5 w-5 ${
                                            done
                                                ? "text-green-500"
                                                : "text-brand-gray/40"
                                        }`}
                                    />
                                    <span className="font-medium text-brand-dark">
                                        {name}
                                    </span>
                                    <span className="text-xs text-brand-forest/50">
                                        {time}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-brand-forest">
                                    {kcal} kcal
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4 rounded-xl border border-brand-gray/20 bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                        Макронутрієнти
                    </h2>
                    <CaloriesDisplay
                        calories={1420}
                        totalWeight={2100}
                    />
                    <MacroCards
                        protein={86}
                        fat={58}
                        carbs={150}
                        fiber={24}
                        wrapperClassName="w-full"
                    />
                </div>
            </div>

            <div className="grid gap-4 laptop:grid-cols-3">
                {quickActions.map(
                    ({ label, description, href, icon: Icon, iconClass }) => (
                        <LinkButton
                            key={label}
                            href={href}
                            variant="outline"
                            className="flex h-full flex-col items-start gap-3 rounded-xl border-brand-gray/20 bg-white p-5 text-left shadow-sm hover:border-brand-teal hover:bg-brand-teal/5"
                        >
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
                            >
                                <Icon className="h-5 w-5" />
                            </span>
                            <span className="font-semibold text-brand-dark">
                                {label}
                            </span>
                            <span className="text-sm text-brand-forest/60">
                                {description}
                            </span>
                        </LinkButton>
                    ),
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
