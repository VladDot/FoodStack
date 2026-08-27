import path from "path";
import dns from "node:dns";
import dotenv from "dotenv";
import { ProductSource } from "@prisma/client";

import { prisma } from "@/shared/api/prisma";

dns.setDefaultResultOrder("ipv4first");

// 1. Завантажуємо .env.local ДО будь-якої ініціалізації Prisma
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// 2. Створюємо окремий екземпляр PrismaClient після завантаження env

type CategoryConfig = {
    name: string;
    terms: string[];
    targetCount: number;
    allowProcessed?: boolean;
};

type USDAFoodNutrient = {
    value: number;
    unitName: string;
    nutrientId: number;
    nutrientName: string;
};

type USDAFood = {
    fdcId: number;
    dataType: string;
    description: string;
    foodNutrients?: USDAFoodNutrient[];
};

type MappedProduct = {
    fat: number;
    name: string;
    carbs: number;
    fiber: number;
    protein: number;
    calories: number;
    source: ProductSource;
    externalFoodId: string;
};

const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1";
const USDA_API_KEY = process.env.USDA_API_KEY;

if (!USDA_API_KEY) {
    throw new Error(
        "❌ USDA_API_KEY не знайдено в .env.local! Перевір наявність змінної.",
    );
}

export const CATEGORIES: CategoryConfig[] = [
    {
        name: "Fruits & Berries",
        targetCount: 70,
        terms: [
            "apple",
            "banana",
            "orange",
            "grape",
            "strawberry",
            "blueberry",
            "raspberry",
            "blackberry",
            "pear",
            "peach",
            "plum",
            "mango",
            "pineapple",
            "watermelon",
            "cantaloupe",
            "kiwi",
            "lemon",
            "lime",
            "cherry",
            "apricot",
            "grapefruit",
            "pomegranate",
            "coconut",
            "avocado",
            "fig",
            "date",
            "cranberry",
            "papaya",
        ],
    },
    {
        name: "Vegetables & Greens",
        targetCount: 100,
        terms: [
            "potato",
            "sweet potato",
            "tomato",
            "carrot",
            "onion",
            "garlic",
            "broccoli",
            "cauliflower",
            "cabbage",
            "spinach",
            "lettuce",
            "cucumber",
            "zucchini",
            "eggplant",
            "bell pepper",
            "green beans",
            "peas",
            "corn",
            "beet",
            "radish",
            "celery",
            "asparagus",
            "pumpkin",
            "mushroom",
            "kale",
            "arugula",
            "leek",
            "artichoke",
            "brussels sprouts",
        ],
    },
    {
        name: "Meat & Poultry",
        targetCount: 60,
        terms: [
            "chicken breast raw",
            "chicken thigh raw",
            "turkey breast raw",
            "beef raw",
            "ground beef 90% raw",
            "ground beef 80% raw",
            "pork loin raw",
            "pork chop raw",
            "lamb raw",
            "veal raw",
            "duck raw",
            "bacon raw",
        ],
    },
    {
        name: "Fish & Seafood",
        targetCount: 40,
        terms: [
            "salmon raw",
            "tuna raw",
            "cod raw",
            "trout raw",
            "sardine raw",
            "mackerel raw",
            "halibut raw",
            "shrimp raw",
            "crab raw",
            "squid raw",
            "mussel raw",
            "oyster raw",
        ],
    },
    {
        name: "Dairy & Eggs",
        targetCount: 50,
        terms: [
            "egg raw",
            "whole milk",
            "skim milk",
            "greek yogurt",
            "cheddar cheese",
            "mozzarella cheese",
            "swiss cheese",
            "parmesan cheese",
            "cottage cheese",
            "butter",
            "sour cream",
            "heavy cream",
            "ricotta",
        ],
        allowProcessed: true,
    },
    {
        name: "Grains & Pasta",
        targetCount: 50,
        terms: [
            "white rice raw",
            "brown rice raw",
            "basmati rice raw",
            "oats raw",
            "wheat flour",
            "whole wheat flour",
            "spaghetti dry",
            "penne dry",
            "quinoa raw",
            "buckwheat raw",
            "barley raw",
            "couscous dry",
            "cornmeal",
        ],
    },
    {
        name: "Legumes",
        targetCount: 30,
        terms: [
            "lentils raw",
            "chickpeas raw",
            "black beans raw",
            "kidney beans raw",
            "white beans raw",
            "soybeans raw",
            "tofu",
            "tempeh",
        ],
    },
    {
        name: "Nuts & Seeds",
        targetCount: 30,
        terms: [
            "almonds",
            "walnuts",
            "cashews",
            "peanuts",
            "pistachios",
            "hazelnuts",
            "pecans",
            "macadamia",
            "sunflower seeds",
            "pumpkin seeds",
            "chia seeds",
            "flax seeds",
        ],
    },
    {
        name: "Oils & Fats",
        targetCount: 15,
        terms: [
            "olive oil",
            "sunflower oil",
            "canola oil",
            "coconut oil",
            "sesame oil",
            "avocado oil",
        ],
        allowProcessed: true,
    },
    {
        name: "Condiments & Baking",
        targetCount: 55,
        terms: [
            "honey",
            "white sugar",
            "brown sugar",
            "maple syrup",
            "cocoa powder",
            "mustard",
            "soy sauce",
            "baking powder",
            "vinegar",
        ],
        allowProcessed: true,
    },
];

async function fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 5,
    backoffMs = 1000,
): Promise<Response> {
    if (retries <= 0) {
        throw new Error("Maximum fetch retries exceeded");
    }

    try {
        const res = await fetch(url, options);

        if (res.status === 429) {
            const retryAfterHeader = res.headers.get("Retry-After");
            const parsedSeconds = Number(retryAfterHeader);

            const waitTime =
                Number.isFinite(parsedSeconds) && parsedSeconds > 0
                    ? parsedSeconds * 1000
                    : backoffMs;

            console.warn(
                `⚠️ Rate limit (429). Waiting ${waitTime}ms... (${retries} retries left)`,
            );
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            return fetchWithRetry(url, options, retries - 1, backoffMs * 2);
        }

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        return res;
    } catch (err) {
        console.warn(
            `⚠️ Network error: ${(err as Error).message}. Retrying in ${backoffMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        return fetchWithRetry(url, options, retries - 1, backoffMs * 2);
    }
}

function getCalories(food: USDAFood): number {
    const nutrients = food.foodNutrients ?? [];

    const kcal = nutrients.find(
        (n) =>
            [1008, 208].includes(n.nutrientId) &&
            n.unitName?.toUpperCase() === "KCAL",
    );
    if (kcal && typeof kcal.value === "number") {
        return Math.round(kcal.value);
    }

    const kj = nutrients.find(
        (n) =>
            [1008, 208, 1062].includes(n.nutrientId) &&
            n.unitName?.toUpperCase() === "KJ",
    );
    if (kj && typeof kj.value === "number") {
        return Math.round(kj.value / 4.184);
    }

    return 0;
}

function getMacro(
    food: USDAFood,
    targetIds: number[],
    nameFallback: string,
): number {
    const nutrients = food.foodNutrients ?? [];

    let nutrient = nutrients.find((n) => targetIds.includes(n.nutrientId));

    if (!nutrient) {
        nutrient = nutrients.find((n) =>
            n.nutrientName.toLowerCase().includes(nameFallback.toLowerCase()),
        );
    }

    if (!nutrient || typeof nutrient.value !== "number") return 0;

    return Math.max(0, Math.round(nutrient.value * 10) / 10);
}

function isSuitableForBaseCatalog(
    food: USDAFood,
    allowProcessed = false,
): boolean {
    const desc = food.description.toLowerCase();

    const stopWords = [
        "cooked",
        "fried",
        "roasted",
        "baked",
        "grilled",
        "canned",
        "sweetened",
        "babyfood",
        "baby food",
        "fast foods",
        "restaurant",
        "prepared",
        "soup",
        "stew",
        "flavored",
        "cereal",
        "infant",
        "beverage",
        "salted",
    ];

    if (!allowProcessed) {
        if (stopWords.some((word) => desc.includes(word))) {
            return false;
        }
    }

    if (desc.length > 90) return false;

    return true;
}

function cleanProductName(rawName: string): string {
    let cleaned = rawName
        .replace(/\([^)]*\)/g, "")
        .replace(/,?\s*raw$/i, "")
        .replace(/\s+/g, " ")
        .trim();

    if (cleaned.length > 0) {
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    return cleaned;
}

async function collectProducts(): Promise<MappedProduct[]> {
    const productMap = new Map<string, MappedProduct>();

    for (const cat of CATEGORIES) {
        let catAddedCount = 0;
        console.log(`\n🔍 Категорія: "${cat.name}" (Ціль: ${cat.targetCount})`);

        for (const term of cat.terms) {
            if (catAddedCount >= cat.targetCount) break;

            const searchUrl = `${USDA_API_URL}/foods/search?api_key=${USDA_API_KEY}`;

            const response = await fetchWithRetry(searchUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: term,
                    pageSize: 25,
                    dataType: ["Foundation", "SR Legacy"],
                }),
            });

            const data = (await response.json()) as { foods?: USDAFood[] };
            const foods = data.foods ?? [];

            for (const food of foods) {
                if (catAddedCount >= cat.targetCount) break;

                const extId = String(food.fdcId);

                if (productMap.has(extId)) continue;
                if (!isSuitableForBaseCatalog(food, cat.allowProcessed))
                    continue;

                const calories = getCalories(food);
                if (calories === 0) continue;

                const cleanedName = cleanProductName(food.description);

                productMap.set(extId, {
                    externalFoodId: extId,
                    source: ProductSource.USDA,
                    name: cleanedName,
                    calories,
                    protein: getMacro(food, [1003], "protein"),
                    fat: getMacro(food, [1004], "total lipid"),
                    carbs: getMacro(food, [1005], "carbohydrate"),
                    fiber: getMacro(food, [1079, 291], "fiber"),
                });

                catAddedCount++;
            }
        }

        console.log(
            `✅ ${cat.name}: зібрано ${catAddedCount} / ${cat.targetCount}`,
        );
    }

    const allProducts = Array.from(productMap.values());
    console.log(
        `\n📊 Всього унікальних продуктів підготовлено: ${allProducts.length}`,
    );
    return allProducts;
}

async function main() {
    console.log("🚀 Запуск збору та імпорту продуктів USDA...");

    const products = await collectProducts();

    console.log("\n💾 Збереження продуктів у таблицю CoreProduct...");

    const result = await prisma.coreProduct.createMany({
        data: products.map((product) => ({
            externalFoodId: product.externalFoodId,
            source: product.source,
            name: product.name,
            calories: product.calories,
            protein: product.protein,
            fat: product.fat,
            carbs: product.carbs,
            fiber: product.fiber,
        })),
        skipDuplicates: true,
    });

    console.log(`\n🎉 Успішно збережено ${result.count} продуктів!`);
}

main()
    .catch((e) => {
        console.error("❌ Помилка:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
