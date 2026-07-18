export default async function RecipePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="p-6">
            <h1>Деталі рецепта {id}</h1>
        </div>
    );
}
