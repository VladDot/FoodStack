"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { SkeletonCard } from "@/shared/ui/skeleton-card";

import { Button } from "../button";

interface SearchResultsProps {
    query: string;
    isEmpty: boolean;
    isError: boolean;
    isLoading: boolean;
    children: ReactNode;
    error: Error | null;
    hasNextPage: boolean;
    onLoadMore: () => void;
    isFetchingNextPage: boolean;
}

export function SearchResults({
    query,
    error,
    isError,
    isEmpty,
    children,
    isLoading,
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
}: SearchResultsProps) {
    const t = useTranslations("search");

    if (!query) return null;

    if (isLoading) {
        return (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-4 p-3 border border-red-200 rounded bg-red-50 text-red-700 text-sm">
                {error?.message || t("errorFallback")}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="mt-4 text-brand-dark/60 text-sm">
                {t("noResults", { query })}
            </div>
        );
    }

    return (
        <div className="mt-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
                {children}
            </ul>

            {hasNextPage && (
                <div className="flex justify-center pt-6">
                    <Button
                        variant="primary"
                        onClick={onLoadMore}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? t("loading") : t("loadMore")}
                    </Button>
                </div>
            )}
        </div>
    );
}
