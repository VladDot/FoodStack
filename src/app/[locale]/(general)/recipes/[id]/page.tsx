import { RecipeDetailPage } from "@/pages";

export default async function RecipePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <RecipeDetailPage id={id} />;
}
