import { z } from "zod";

import "server-only";

const edamamConfigSchema = z.object({
    EDAMAM_FOOD_APP_ID: z.string().min(1),
    EDAMAM_FOOD_APP_KEY: z.string().min(1),
});

let cachedConfig: z.infer<typeof edamamConfigSchema> | null = null;

function loadAndValidate() {
    if (cachedConfig) return cachedConfig;

    const result = edamamConfigSchema.safeParse(process.env);

    if (!result.success) {
        const missing = result.error.issues
            .map((i) => i.path.join("."))
            .join(", ");
        throw new Error(`Missing Edamam config vars: ${missing}`);
    }

    cachedConfig = result.data;
    return cachedConfig;
}

export const edamamConfig = {
    get EDAMAM_FOOD_APP_ID() {
        return loadAndValidate().EDAMAM_FOOD_APP_ID;
    },
    get EDAMAM_FOOD_APP_KEY() {
        return loadAndValidate().EDAMAM_FOOD_APP_KEY;
    },
};
