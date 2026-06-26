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
        carbohydrates_150g?: number;
    };
}

export async function getProductsByQuery(
    query: string,
    page: number = 1,
): Promise<IExternalProduct[]> {
    if (!query) return [];

    try {
        // 1. Додано &page=${page} в кінець URL, щоб пагінація фізично запрацювала
        const res = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
                query,
            )}&search_simple=1&action=process&json=1&page_size=10&page=${page}`,
        );

        // Якщо сервер відповів помилкою (наприклад, 400 чи 500)
        if (!res.ok) {
            console.error(
                `Open Food Facts API повернуло статус: ${res.status}`,
            );
            return [];
        }

        const data = await res.json();
        return data.products || [];
    } catch (error) {
        // 2. Захист від мережевих збоїв — додаток не впаде, а просто поверне порожній масив
        console.error(
            "Критична помилка при запиті до Open Food Facts API:",
            error,
        );
        return [];
    }
}
