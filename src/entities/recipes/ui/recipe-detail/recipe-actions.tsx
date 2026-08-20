"use client";

import { useTransition } from "react";

import { Heart } from "lucide-react";

import { Button } from "@/shared/ui";
import { addRecipeToFavorite } from "@/features/favorites/api/add-recipe";

import { CleanRecipeDetailItem } from "../../model";

interface RecipeActionProps {
    recipe: CleanRecipeDetailItem;
}

export const RecipeAction = ({ recipe }: RecipeActionProps) => {
    const [isPending, startTransition] = useTransition();

    const handleSave = () => {
        startTransition(async () => {
            try {
                await addRecipeToFavorite(recipe);
            } catch (error) {
                console.error("Error adding recipe to favorites:", error);
            }
        });
    };
    return (
        <div>
            <Button
                className="w-full mt-4 gap-4"
                variant="primary"
                leftIcon={<Heart className="w-5 h-5" />}
                onClick={handleSave}
            >
                {isPending ? "Adding..." : "Add to Favorites"}
            </Button>
        </div>
    );
};
