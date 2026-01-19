import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

export default defineConfig([
    // Next.js базові правила
    ...nextVitals,
    ...nextTs,

    // Ігнори
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

    // Boundaries rules
    {
        plugins: {
            boundaries,
        },

        settings: {
            "boundaries/elements": [
                { type: "app", pattern: "src/app/**" },
                { type: "components", pattern: "src/components/**" },
                { type: "hooks", pattern: "src/hooks/**" },
                { type: "utils", pattern: "src/utils/**" },
                { type: "styles", pattern: "src/styles/**" },
                { type: "types", pattern: "src/types/**" },
            ],
        },

        rules: {
            "boundaries/element-types": [
                "error",
                {
                    default: "allow",
                    rules: [
                        {
                            from: "app",
                            allow: ["components", "styles", "types"],
                        },
                        {
                            from: "components",
                            allow: ["hooks", "utils", "styles", "types"],
                        },
                        {
                            from: "hooks",
                            allow: ["utils", "types"],
                        },
                        {
                            from: "utils",
                            allow: ["types"],
                        },
                    ],
                },
            ],
        },
    },
]);
