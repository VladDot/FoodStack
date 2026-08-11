import { z } from "zod";

import "server-only";

const spoonacularConfigSchema = z.object({
    SPOONACULAR_API_KEY: z.string().min(1),
});

let cachedConfig: z.infer<typeof spoonacularConfigSchema> | null = null;

function loadAndValidate() {
    if (cachedConfig) return cachedConfig;

    const result = spoonacularConfigSchema.safeParse(process.env);

    if (!result.success) {
        const missing = result.error.issues
            .map((i) => i.path.join("."))
            .join(", ");
        throw new Error(`Missing Spoonacular config vars: ${missing}`);
    }

    cachedConfig = result.data;
    return cachedConfig;
}

export const spoonacularConfig = {
    get SPOONACULAR_API_KEY() {
        return loadAndValidate().SPOONACULAR_API_KEY;
    },
};
