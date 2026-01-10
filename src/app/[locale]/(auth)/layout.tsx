import { HeaderWrapper } from "@/widgets";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HeaderWrapper />

            {children}
        </>
    );
}
