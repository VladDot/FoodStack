import { ReactNode } from "react";

interface SearchPageLayoutProps {
    title: string;
    results: ReactNode;
    searchInput: ReactNode;
}

export function SearchPageLayout({
    title,
    results,
    searchInput,
}: SearchPageLayoutProps) {
    return (
        <main className="p-6 max-w-4xl mx-auto flex flex-col items-center min-h-screen bg-zinc-950 text-zinc-100">
            <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight">
                {title}
            </h1>

            <div className="mb-8 w-full flex justify-center">{searchInput}</div>

            <div className="w-full grid grid-cols-1 gap-3">{results}</div>
        </main>
    );
}
