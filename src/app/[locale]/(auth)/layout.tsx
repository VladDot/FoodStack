export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="bg-page flex-1 container-app">
                <div className=" flex justify-center pt-10">{children}</div>
            </main>
        </>
    );
}
