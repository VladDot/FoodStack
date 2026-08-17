# Реалізація системи "Улюблені рецепти" (Favorites)

Довідковий документ для розробника. Містить точні шляхи, існуючі типи та готові коди
для трьох гілок реалізації. Стоків на реальні файли проєкту (перевірено на момент написання).

> **Важливо перед стартом:** поточна міграція `recipes` (`20260605143758_init_diary_and_recipes`)
> НЕ збігається зі схемою. У БД таблиця `recipes` має колонки `calories_per_100`,
> `protein_per_100`, `fat_per_100`, `carbs_per_100`, `user_id NOT NULL`. У схемі цих полів
> немає, а є `dish_types`, `nutrition`, `analyzed_instructions` тощо, а `user_id` nullable.
> Таблиці `favorites` у міграціях НЕМАЄ взагалі. Тому Гілка 1 обов'язкова.

---

## Гілка 1: `feature/favorites-schema` (База даних)

### Моделі вже в схемах (об'єднані через `prisma/schema` у `prisma.config.ts`)

- `prisma/schema/recipes.prisma` — `model Recipe`
- `prisma/schema/favorite.prisma` — `model Favorite`
- `prisma/schema/main.prisma` — `User` + `datasource` + `generator` + зв'язки

Вже коректно (перевірено `npx prisma validate` ✅):
- `Recipe.externalFoodId` — `String? @unique` (ключ для дедуплікації)
- `Recipe.favorites Favorite[]`
- `Favorite` — `@@unique([userId, recipeId])`, обидва зв'язки з `onDelete: Cascade`
- `User.recipes` та `User.favorites`

### Кроки

```bash
# 1) застосувати зміни (створить таблицю favorites + вирівняє recipes)
npx prisma migrate dev --name add_favorites_system

# 2) оновити клієнтські типи TS
npx prisma generate

# 3) перевірити в Supabase Studio:
#    - колонки recipes збігаються зі схемою
#    - таблиця favorites з FK на users(id) та recipes(id), ON DELETE CASCADE
#    - UNIQUE(user_id, recipe_id)
```

> **Статус генерації:** `src/generated/prisma/models/Recipe.ts` застарілий (містить `content`,
> числовий `userId`) — вірна ознака, що `prisma generate` давно не запускався.
> Після міграції генерація перезапише ці файли.

---

## Гілка 2: `feature/favorites-actions` (Серверна логіка)

### Існуючі відповідники (НЕ писати з нуля)

| Потреба | Файл | Що дає |
|---|---|---|
| Клієнт Prisma | `src/shared/api/prisma.ts` | експорт `prisma` |
| Схема Spoonacular (деталі) | `src/entities/recipes/api/spoonacular/details.schemas.ts` | `spoonacularRecipeDetailSchema`, тип `SpoonacularRecipeDetail` |
| Фетч деталей рецепта | `src/entities/recipes/api/spoonacular/recipe-details.server.ts` | `fetchRecipesByIdFromSpoonacular`, `getRecipeById` (unstable_cache) |
| Мапінг у чистий вигляд | `src/entities/recipes/model/recipe-detail.mapper.ts` | `mapResponseToCleanRecipeDetail` |
| Типи чистих даних | `src/entities/recipes/model/types.ts` | `CleanRecipeItem`, `CleanRecipeDetailItem` |
| Авторизація | `src/shared/lib/auth.ts` | `auth()` з NextAuth; `session.user.id` (JWT) |

### Куди пхати new-файли (FSD feature)

```
src/features/favorites/
├── api/          # server actions / data layer
│   ├── toggle-favorite.ts
│   └── schemas.ts        # zod-схема вхідних даних
└── services/
    └── toggle-favorite.service.ts   # чисті upsert-логіка (без req/res)
```

### ZOD-схема для входу з Spoonacular

Клас `SpoonacularRecipeDetail` вже існує (`details.schemas.ts`) і покриває `id, title, image,
summary, readyInMinutes, servings, sourceName, sourceUrl, dishTypes, diets,
extendedIngredients, nutrition, analyzedInstructions, healthScore, pricePerServing` —
валідувати ним, а не дублювати. Для серверного action достатньо вхідного contractу:

```ts
// src/features/favorites/api/schemas.ts
import { z } from "zod";

export const toggleFavoriteSchema = z.object({
    // externalFoodId = Spoonacular id (рядком!)
    externalFoodId: z.string().min(1),
    recipeData: z.optional(z.lazy(() => require("../..").SpoonacularRecipeDetail)),
});

export type ToggleFavoriteInput = z.infer<typeof toggleFavoriteSchema>;
```

### upsert-логіка з транзакцією (ключова порада плану)

```ts
// src/features/favorites/services/toggle-favorite.service.ts
import { prisma } from "@/shared/api/prisma";

/**
 * Повертає { isFavorite } наявного для юзера стану після toggle.
 * Транзакція: upsert Recipe + toggle Favorite — неподільно.
 */
export async function toggleFavoriteService(input: {
    userId: string;
    externalFoodId: string;
    recipeData?: unknown; // валідований SpoonacularRecipeDetail
}) {
    const { userId, externalFoodId, recipeData } = input;

    return prisma.$transaction(async (tx) => {
        // 1) знайти рецепт за зовнішнім id
        let recipe = await tx.recipe.findUnique({
            where: { externalFoodId },
            select: { id: true },
        });

        // 2) якщо немає — створити (беремо id існуючого, якщо є)
        if (!recipe) {
            const created = await tx.recipe.create({
                data: {
                    externalFoodId,
                    title: recipeData?.title ?? "Untitled Recipe",
                    imageUrl: recipeData?.image ?? null,
                    summary: recipeData?.summary ?? null,
                    readyInMinutes: recipeData?.readyInMinutes ?? null,
                    servings: recipeData?.servings ?? null,
                    sourceName: recipeData?.sourceName ?? null,
                    sourceUrl: recipeData?.sourceUrl ?? null,
                    dishTypes: recipeData?.dishTypes ?? [],
                    diets: recipeData?.diets ?? [],
                    extendedIngredients: recipeData?.extendedIngredients ?? [],
                    nutrition: recipeData?.nutrition ?? Prisma.JsonNull,
                    analyzedInstructions: recipeData?.analyzedInstructions ?? [],
                    healthScore: recipeData?.healthScore ?? null,
                    pricePerServing: recipeData?.pricePerServing ?? null,
                },
                select: { id: true },
            });
            recipe = created;
        }

        // 3) toggle Favorite за (userId + recipeId)
        const existing = await tx.favorite.findUnique({
            where: { userId_recipeId: { userId, recipeId: recipe.id } },
        });

        if (existing) {
            await tx.favorite.delete({ where: { id: existing.id } });
            return { isFavorite: false };
        }

        await tx.favorite.create({
            data: { userId, recipeId: recipe.id },
        });
        return { isFavorite: true };
    });
}
```

> Зверни увагу: у схемі `externalFoodId @unique` реляційний ключ isUnique — використовуємо
> `findUnique({ where: { externalFoodId } })` для дедуплікації. Дублікатів не буде, бо
> `@@unique` на `externalFoodId` — констрейнт БД.

### Server Action (обгортка над сервісом)

```ts
// src/features/favorites/api/toggle-favorite.ts
"use server";

import { auth } from "@/shared/lib/auth";
import { ApiError } from "@/shared/lib";
import { toggleFavoriteSchema } from "./schemas";
import { toggleFavoriteService } from "../services/toggle-favorite.service";

export async function toggleFavorite(rawInput: unknown) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new ApiError(401, "Unauthorized");

    const parsed = toggleFavoriteSchema.safeParse(rawInput);
    if (!parsed.success) throw new ApiError(400, "Invalid input");

    return toggleFavoriteService({
        userId,
        externalFoodId: parsed.data.externalFoodId,
        recipeData: parsed.data.recipeData,
    });
}
```

### Перевірка на дублікати

Напиши разовий скрипт `scripts/test-toggle.ts` і запускай через `npx ts-node`:

```ts
import "dotenv/config";
import { prisma } from "../src/shared/api/prisma";

async function main() {
    const userId = "REAL_USER_ID";
    const extId = "716429";
    const a = await toggleFavoriteService({ userId, externalFoodId: extId, recipeData: recipeDetail });
    const dup = await prisma.recipe.count({ where: { externalFoodId: extId } });
    console.log({ a, recipeRowsForExtId: dup }); // очікуємо 1 row незалежно від числа тоглів
    await prisma.$disconnect();
}
main();
```

---

## Гілка 3: `feature/favorites-ui` (Інтерфейс)

### Куди вставляти (вже існуючі хуки)

- Кнопка "серце" → компонент `RecipeHeader` у
  `src/entities/recipes/ui/recipe-detail/recipe-header.tsx` (поле `recipe.image`/`recipe.title`).
- Сторінка списку вже веде прайм-слот `src/app/[locale]/(user)/dashboard/saved/page.tsx`
  (зараз порожній `<Saved />`) — заповнити її.

### FavoriteButton (клієнтський компонент + useTransition)

```tsx
// src/features/favorites/ui/favorite-button/index.tsx  ("use client")
"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "../../api/toggle-favorite";

export function FavoriteButton({ externalFoodId, initial }: {
    externalFoodId: string;
    initial: boolean;
}) {
    const [isFavorite, setIsFavorite] = useState(initial);
    const [isPending, startTransition] = useTransition();

    function handleClick() {
        startTransition(async () => {
            const res = await toggleFavorite({ externalFoodId });
            if (res) setIsFavorite(res.isFavorite);
        });
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            aria-pressed={isFavorite}
            aria-label="Toggle favorite"
            className={isFavorite ? "text-red-500" : "text-zinc-400"}
        >
            <Heart className={isFavorite ? "fill-current" : ""} />
        </button>
    );
}
```

### Інтеграція в RecipeHeader

`RecipeHeader` — серверний компонент, але він приймає `CleanRecipeDetailItem` з полем
`id` = Spoonacular id. Передай `externalFoodId={recipe.id}` у клієнтський `FavoriteButton`;

### Сторінка "Мої улюблені" (JOIN Favorite → Recipe)

```tsx
// src/app/[locale]/(user)/dashboard/saved/page.tsx
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/api/prisma";

export default async function Saved() {
    const session = await auth();
    if (!session?.user?.id) return <p>Sign in required</p>;

    const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
        include: { recipe: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <ul>
            {favorites.map((f) => (
                <li key={f.id}>
                    <img src={f.recipe.imageUrl ?? ""} alt={f.recipe.title} />
                    <span>{f.recipe.title}</span>
                </li>
            ))}
        </ul>
    );
}
```

---

## Чеклист перед commit'ом у гілку

- [ ] `npx prisma migrate dev --name add_favorites_system` (Гілка 1)
- [ ] `npx prisma generate` (Гілка 1)
- [ ] таблиця `favorites` + колонки `recipes` видно в Supabase Studio
- [ ] `npx tsc --noEmit` чистий
- [ ] `npm run lint` чистий (у проєкті `eslint-plugin-boundaries` — дотримуйся FSD імпортів)
- [ ] `extendedIngredients`/`nutrition`/`analyzedInstructions` — тип `Json`; для null передавай
      `Prisma.JsonNull`. Імпорт: `import { Prisma } from "@prisma/client"`.

## Поточні ризики

1. **Стагнація міграцій** — `favorites` не розгорнуте; спочатку Гілка 1.
2. **Схема Recipe зміниться** — відповідно оновиться `RecipeHeader`/mapper, якщо вимагає
   UI (колонки вже є в `recipe-detail.mapper.ts` частково).
3. **`getRecipeById` — cached 7 днів**, для свіжого запису в БД при toggle найкраще передавати
   `recipeData` з клієнта (вже є `SpoonacularRecipeDetail`), а не фетчити знову.