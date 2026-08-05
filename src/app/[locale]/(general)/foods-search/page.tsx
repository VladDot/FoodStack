import { Suspense } from "react";

import { FoodSearchPage } from "@/pages";

function FoodsSearch() {
    return (
        <Suspense fallback={null}>
            <FoodSearchPage />
        </Suspense>
    );
}

export default FoodsSearch;
