import { Suspense } from "react";

import { SavedRecipesPage } from "@/pages/saved-recipes";

function Saved({}) {
    return (
        <Suspense fallback={null}>
            <SavedRecipesPage />
        </Suspense>
    );
}

export default Saved;
