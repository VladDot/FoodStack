import { LinkButton } from "@/shared/ui";

export function NotFoundState({
    title,
    message,
    backHref,
    backLabel,
}: {
    title: string;
    message: string;
    backHref: string;
    backLabel: string;
}) {
    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-200 flex flex-col items-center gap-4 text-center">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="text-sm text-zinc-600">{message}</p>
                <LinkButton
                    href={backHref}
                    variant="cta"
                >
                    {backLabel}
                </LinkButton>
            </div>
        </section>
    );
}