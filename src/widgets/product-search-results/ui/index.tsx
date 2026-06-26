import { Pagination } from "@/shared/ui";
import { prisma } from "@/shared/lib/db/prisma";
import { saveProductAction } from "@/entities/product/api/actions";
import { getProductsByQuery } from "@/entities/product/api/getProducts";

interface ProductResultsProps {
    page: number;
    query: string;
}

export async function ProductResults({ query, page }: ProductResultsProps) {
    if (!query) {
        return (
            <p className="text-center text-zinc-500 py-8 text-sm">
                Почніть вводити назву продукту...
            </p>
        );
    }

    const externalProducts = await getProductsByQuery(query, page);

    if (!externalProducts || externalProducts.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4">
                <p className="text-center text-zinc-400 py-8">
                    Нічого не знайдено за запитом {query} на сторінці {page}
                </p>
                {page > 1 && <Pagination hasMore={false} />}
            </div>
        );
    }

    const productIds = externalProducts
        .map((p) => p.code)
        .filter(Boolean) as string[];

    const savedProducts = await prisma.product.findMany({
        where: {
            id: { in: productIds },
        },
        select: { id: true },
    });

    const savedIdsSet = new Set(savedProducts.map((p) => p.id));

    const hasMore = externalProducts.length >= 10;

    return (
        <div className="flex flex-col gap-3 mt-4">
            {externalProducts.map((product) => {
                const isAlreadySaved = savedIdsSet.has(product.code);

                return (
                    <div
                        key={product.code}
                        className="p-4 border border-zinc-850 rounded-xl bg-zinc-900 shadow-sm flex items-center justify-between hover:border-zinc-700 transition-colors"
                    >
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-zinc-100 text-base leading-tight">
                                {product.product_name || "Невідомий продукт"}
                            </h3>
                            <p className="text-xs text-zinc-450">
                                Бренд:{" "}
                                <span className="text-zinc-300">
                                    {product.brands || "не вказано"}
                                </span>
                            </p>
                            <div className="mt-1">
                                <span className="inline-block text-xs bg-zinc-800 text-emerald-400 px-2 py-0.5 rounded font-medium">
                                    {product.nutriments?.["energy-kcal_100g"] ??
                                        0}{" "}
                                    ккал / 100г
                                </span>
                            </div>
                        </div>

                        {isAlreadySaved ? (
                            <button
                                disabled
                                className="text-xs bg-zinc-800 text-zinc-500 border border-zinc-750 px-3 py-2 rounded-lg font-medium cursor-not-allowed select-none"
                            >
                                Вже додано ✓
                            </button>
                        ) : (
                            <form action={saveProductAction}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={product.code}
                                />
                                <input
                                    type="hidden"
                                    name="name"
                                    value={
                                        product.product_name ||
                                        "Невідомий продукт"
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="brand"
                                    value={product.brands || ""}
                                />
                                <input
                                    type="hidden"
                                    name="calories"
                                    value={
                                        product.nutriments?.[
                                            "energy-kcal_100g"
                                        ] ?? 0
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="protein"
                                    value={
                                        product.nutriments?.proteins_100g ?? 0
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="fat"
                                    value={product.nutriments?.fat_100g ?? 0}
                                />
                                <input
                                    type="hidden"
                                    name="carbs"
                                    value={
                                        product.nutriments
                                            ?.carbohydrates_100g ?? 0
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="imageUrl"
                                    value={product.image_url || ""}
                                />

                                <button
                                    type="submit"
                                    className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-lg font-medium hover:bg-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                                >
                                    Вибрати
                                </button>
                            </form>
                        )}
                    </div>
                );
            })}

            <Pagination hasMore={hasMore} />
        </div>
    );
}
