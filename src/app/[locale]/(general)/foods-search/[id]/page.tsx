import { FoodDetailPage } from "@/pages/food-detail";

export default async function ProductPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ image?: string }>;
}) {
    const { id } = await params;
    const { image } = await searchParams;

    return (
        <FoodDetailPage
            id={id}
            image={image}
        />
    );
}
