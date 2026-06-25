export interface IExternalProduct {
    code: string;
    brands?: string;
    image_url?: string;
    product_name?: string;
    nutriments?: {
        fat_100g?: number;
        proteins_100g?: number;
        "energy-kcal_100g"?: number;
        carbohydrates_100g?: number;
    };
}

export async function getProductsByQuery(
    query: string,
): Promise<IExternalProduct[]> {
    if (!query) return [];

    const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
            query,
        )}&search_simple=1&action=process&json=1&page_size=10`,
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
}
