import type { CleanProduct } from "@/entities/product";

import { offClient } from "./client";
import { mapProduct } from "./map-product";
import { offSearchResponseSchema } from "./schemas";

export async function searchProducts(query: string): Promise<CleanProduct[]> {
    if (!query.trim()) return [];

    try {
        const { data } = await offClient.get<unknown>("/cgi/search.pl", {
            params: {
                search_terms: query,
                json: "true",
                page_size: 15,
                fields: "code,product_name,brands,image_front_url,nutriments",
            },
        });

        const validatedData = offSearchResponseSchema.parse(data);

        return validatedData.products.map(mapProduct);
    } catch (error) {
        console.error("Помилка валідації або запиту Open Food Facts:", error);
        return [];
    }
}
