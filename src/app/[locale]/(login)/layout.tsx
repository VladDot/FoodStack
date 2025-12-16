import { HeaderWrapper } from "@/components";

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
