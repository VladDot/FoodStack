export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="bg-page  min-h-[calc(100vh-64px)] tablet:min-h-[calc(100vh-88px)] container-app">
                <div className=" flex justify-center pt-10 ">{children}</div>
            </main>
        </>
    );
}
