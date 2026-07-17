export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className=" flex-1 ">
                <div className=" flex justify-center pt-10">{children}</div>
            </main>
        </>
    );
}
