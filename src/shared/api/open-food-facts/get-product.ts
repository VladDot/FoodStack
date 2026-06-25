import type { CleanProduct } from "@/entities/product";

import { offClient } from "./client";
import { mapProduct } from "./map-product";
import type { OFFBarcodeResponse } from "./types";

export async function getProductByBarcode(
    barcode: string,
): Promise<CleanProduct | null> {
    try {
        const { data } = await offClient.get<OFFBarcodeResponse>(
            `/api/v2/product/${barcode}.json`,
            {
                params: {
                    fields: "code,product_name,brands,image_front_url,nutriments",
                },
            },
        );

        if (data.status !== 1 || !data.product) {
            return null;
        }

        return mapProduct(data.product);
    } catch (error) {
        console.error(
            `Помилка запиту продукту за штрих-кодом ${barcode}:`,
            error,
        );
        return null;
    }
}
