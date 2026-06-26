"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    hasMore: boolean; // Серверу все ще треба сказати нам, чи є дані далі
}

export function Pagination({ hasMore }: PaginationProps) {
    const pathname = usePathname(); // Автоматично отримує поточний шлях (наприклад, "/products" або "/")
    const searchParams = useSearchParams(); // Отримує всі поточні query-параметри

    const query = searchParams.get("query") || "";
    const currentPage = Number(searchParams.get("page")) || 1;

    if (!query) return null;

    // Чиста генерація посилання: беремо поточні параметри, міняємо тільки 'page'
    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage + 1;

    return (
        <div className="flex items-center justify-center gap-4 mt-6 py-4 border-t border-zinc-850">
            {/* Кнопка НАЗАД */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(prevPage)}
                    className="text-xs bg-zinc-900 text-zinc-300 border border-zinc-800 px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
                >
                    ← Назад
                </Link>
            ) : (
                <span className="text-xs bg-zinc-950 text-zinc-600 border border-zinc-900 px-4 py-2 rounded-lg font-medium cursor-not-allowed opacity-50">
                    ← Назад
                </span>
            )}

            {/* Номер сторінки */}
            <span className="text-sm text-zinc-400 font-medium bg-zinc-850 px-3 py-1.5 rounded-md">
                Сторінка {currentPage}
            </span>

            {/* Кнопка ВПЕРЕД */}
            {hasMore ? (
                <Link
                    href={createPageUrl(nextPage)}
                    className="text-xs bg-zinc-900 text-zinc-300 border border-zinc-800 px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
                >
                    Вперед →
                </Link>
            ) : (
                <span className="text-xs bg-zinc-950 text-zinc-600 border border-zinc-900 px-4 py-2 rounded-lg font-medium cursor-not-allowed opacity-50">
                    Вперед →
                </span>
            )}
        </div>
    );
}
