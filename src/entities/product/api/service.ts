"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { getProductByBarcode } from "@/shared/api/open-food-facts";

import type { CleanProduct } from "../model/types";

export async function getOrFetchProduct(
    barcode: string,
): Promise<CleanProduct | null> {
    if (!barcode.trim()) return null;

    try {
        const localProduct = await prisma.product.findUnique({
            where: { id: barcode },
        });

        if (localProduct) {
            return localProduct as CleanProduct;
        }

        const externalProduct = await getProductByBarcode(barcode);

        if (!externalProduct) {
            return null;
        }

        const savedProduct = await prisma.product.create({
            data: {
                id: externalProduct.id,
                name: externalProduct.name,
                brand: externalProduct.brand,
                calories: externalProduct.calories,
                protein: externalProduct.protein,
                fat: externalProduct.fat,
                carbs: externalProduct.carbs,
                imageUrl: externalProduct.imageUrl,
            },
        });

        return savedProduct as CleanProduct;
    } catch (error) {
        console.error(
            `Помилка у сервісі getOrFetchProduct для баркоду ${barcode}:`,
            error,
        );
        return null;
    }
}
