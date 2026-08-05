import { Suspense } from "react";

import { RecipesSearchPage } from "@/pages";

function Recipes({}) {
    return (
        <div className="flex flex-col gap-6">
            <Suspense fallback={null}>
                <RecipesSearchPage />
            </Suspense>
        </div>
    );
}

export default Recipes;
