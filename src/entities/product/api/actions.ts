"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/shared/lib/db/prisma";

export async function saveProductAction(formData: FormData): Promise<void> {
    const rawId = formData.get("id");
    const rawName = formData.get("name");

    if (
        !rawId ||
        !rawName ||
        typeof rawId !== "string" ||
        typeof rawName !== "string"
    ) {
        console.error(
            "Валідація екшена провалена: відсутні або некоректні id/name",
        );
        return;
    }

    try {
        await prisma.product.upsert({
            where: { id: rawId.trim() },
            update: {},
            create: {
                id: rawId.trim(),
                name: rawName.trim(),
                brand: ((formData.get("brand") as string) || "").trim(),
                calories: Number(formData.get("calories")) || 0,
                protein: Number(formData.get("protein")) || 0,
                fat: Number(formData.get("fat")) || 0,
                carbs: Number(formData.get("carbs")) || 0,
                imageUrl: ((formData.get("imageUrl") as string) || "").trim(),
            },
        });

        revalidatePath("/products");
    } catch (error) {
        console.error("Критична помилка збереження продукту в БД:", error);
    }
}
