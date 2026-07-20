export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="p-6">
            <h1>Деталі продукту {id}</h1>
        </div>
    );
}
