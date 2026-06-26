// src/app/products/page.tsx
import { Suspense } from "react";

import { ProductResults } from "@/widgets";
import { SearchInput, SearchPageLayout } from "@/shared/ui";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        query?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const query = params.query || "";
    const page = Number(params.page) || 1;

    return (
        <SearchPageLayout
            title="Пошук продуктів"
            searchInput={<SearchInput paramName="query" />}
            results={
                <Suspense
                    key={`${query}-${page}`}
                    fallback={
                        <p className="text-center py-8 text-zinc-500 animate-pulse">
                            Шукаємо продукти...
                        </p>
                    }
                >
                    <ProductResults
                        query={query}
                        page={page}
                    />
                </Suspense>
            }
        />
    );
}
