import { SearchInput, SearchPageLayout } from "@/shared/ui";
import { getProductsByQuery } from "@/entities/product/api/getProducts";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        query?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
    // У Next.js 15+ searchParams — це Promise, обов'язково робимо await
    const { query = "" } = await searchParams;

    // Серверний запит до API Open Food Facts
    const products = await getProductsByQuery(query);

    return (
        <SearchPageLayout
            title="Пошук продуктів харчування"
            searchInput={
                <SearchInput
                    label="Назва продукту або бренд"
                    placeholder="Введіть напр. яблуко, кока-кола..."
                    paramName="query"
                />
            }
            results={
                <>
                    {query && products.length === 0 && (
                        <p className="text-center text-zinc-500 py-8">
                            Нічого не знайдено в базі Open Food Facts за запитом
                            {query}
                        </p>
                    )}

                    {!query && (
                        <p className="text-center text-zinc-600 py-8 text-sm">
                            Почніть вводити назву продукту вище для запуску
                            живого пошуку.
                        </p>
                    )}

                    {products.map((product) => (
                        <div
                            key={product.code}
                            className="p-4 border border-zinc-850 rounded-xl bg-zinc-900 shadow-sm flex items-center justify-between hover:border-emerald-500/40 transition-colors"
                        >
                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold text-zinc-100 text-base leading-tight">
                                    {product.product_name ||
                                        "Невідомий продукт"}
                                </h3>
                                <p className="text-xs text-zinc-450">
                                    Бренд:{" "}
                                    <span className="text-zinc-300">
                                        {product.brands || "не вказано"}
                                    </span>
                                </p>
                                <div className="mt-1">
                                    <span className="inline-block text-xs bg-zinc-800 text-emerald-400 px-2 py-0.5 rounded font-medium">
                                        {product.nutriments?.[
                                            "energy-kcal_100g"
                                        ] ?? 0}{" "}
                                        ккал / 100г
                                    </span>
                                </div>
                            </div>

                            <button className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-lg font-medium hover:bg-emerald-500/20 transition-all active:scale-95">
                                Вибрати
                            </button>
                        </div>
                    ))}
                </>
            }
        />
    );
}
