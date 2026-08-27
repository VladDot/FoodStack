import { prisma } from "@/shared/api/prisma";

const coreProducts = [
    {
        name: "Buckwheat (Dry)",
        brand: null,
        externalFoodId: "local-buckwheat-dry",
        calories: 343,
        protein: 13.3,
        fat: 3.4,
        carbs: 71.5,
        fiber: 10.0,
        userId: null,
    },
    {
        name: "Chicken Breast (Raw)",
        brand: null,
        externalFoodId: "local-chicken-breast",
        calories: 165,
        protein: 31.0,
        fat: 3.6,
        carbs: 0.0,
        fiber: 0.0,
        userId: null,
    },
    {
        name: "Whole Eggs",
        brand: null,
        externalFoodId: "local-whole-eggs",
        calories: 143,
        protein: 12.6,
        fat: 9.9,
        carbs: 0.7,
        fiber: 0.0,
        userId: null,
    },
    {
        name: "White Rice (Dry)",
        brand: null,
        externalFoodId: "local-white-rice",
        calories: 360,
        protein: 6.7,
        fat: 0.7,
        carbs: 79.0,
        fiber: 1.4,
        userId: null,
    },
    {
        name: "Oatmeal (Dry)",
        brand: null,
        externalFoodId: "local-oatmeal",
        calories: 389,
        protein: 16.9,
        fat: 6.9,
        carbs: 66.3,
        fiber: 10.6,
        userId: null,
    },
    {
        name: "Cottage Cheese (5%)",
        brand: null,
        externalFoodId: "local-cottage-cheese-5",
        calories: 121,
        protein: 16.0,
        fat: 5.0,
        carbs: 1.8,
        fiber: 0.0,
        userId: null,
    },
    {
        name: "Whole Milk (3.2%)",
        brand: null,
        externalFoodId: "local-milk-3-2",
        calories: 60,
        protein: 3.2,
        fat: 3.2,
        carbs: 4.7,
        fiber: 0.0,
        userId: null,
    },
    {
        name: "Banana",
        brand: null,
        externalFoodId: "local-banana",
        calories: 89,
        protein: 1.1,
        fat: 0.3,
        carbs: 22.8,
        fiber: 2.6,
        userId: null,
    },
    {
        name: "Apple",
        brand: null,
        externalFoodId: "local-apple",
        calories: 52,
        protein: 0.3,
        fat: 0.2,
        carbs: 13.8,
        fiber: 2.4,
        userId: null,
    },
    {
        name: "Potato (Boiled)",
        brand: null,
        externalFoodId: "local-potato-boiled",
        calories: 87,
        protein: 1.9,
        fat: 0.1,
        carbs: 20.1,
        fiber: 1.8,
        userId: null,
    },
    {
        name: "Olive Oil",
        brand: null,
        externalFoodId: "local-olive-oil",
        calories: 884,
        protein: 0.0,
        fat: 100.0,
        carbs: 0.0,
        fiber: 0.0,
        userId: null,
    },
    {
        name: "Butter (82%)",
        brand: null,
        externalFoodId: "local-butter",
        calories: 717,
        protein: 0.85,
        fat: 81.1,
        carbs: 0.06,
        fiber: 0.0,
        userId: null,
    },
    {
        name: "Peanut Butter",
        brand: null,
        externalFoodId: "local-peanut-butter",
        calories: 588,
        protein: 25.0,
        fat: 50.0,
        carbs: 20.0,
        fiber: 6.0,
        userId: null,
    },
    {
        name: "White Bread",
        brand: null,
        externalFoodId: "local-white-bread",
        calories: 265,
        protein: 9.0,
        fat: 3.2,
        carbs: 49.0,
        fiber: 2.7,
        userId: null,
    },
    {
        name: "Beef (Raw)",
        brand: null,
        externalFoodId: "local-beef-raw",
        calories: 250,
        protein: 26.0,
        fat: 15.0,
        carbs: 0.0,
        fiber: 0.0,
        userId: null,
    },
];

async function main() {
    console.log("Початок сідінга базових продуктів...");

    for (const product of coreProducts) {
        await prisma.coreProduct.upsert({
            where: { externalFoodId: product.externalFoodId },
            update: {
                name: product.name,
                brand: product.brand,
                calories: product.calories,
                protein: product.protein,
                fat: product.fat,
                carbs: product.carbs,
                fiber: product.fiber,
            },
            create: product,
        });
        console.log(`Оброблено: ${product.name}`);
    }

    console.log("Сідінг успішно завершено!");
}

main()
    .catch((e) => {
        console.error("Помилка під час виконання сідеру:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
