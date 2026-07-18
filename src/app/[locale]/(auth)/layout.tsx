export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className=" flex justify-center pt-10">{children}</div>;
}
