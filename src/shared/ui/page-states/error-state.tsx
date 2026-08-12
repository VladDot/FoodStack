"use client";

import { useEffect } from "react";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui";

export function ErrorState({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    const t = useTranslations("errorState");

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section
            role="alert"
            className="max-w-4xl mx-auto px-4 py-8"
        >
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center gap-4 text-center">
                <AlertTriangle className="size-10 text-red-500" />
                <h2 className="text-xl font-semibold text-red-800">
                    {t("title")}
                </h2>
                <p className="text-sm text-red-600">{t("message")}</p>
                <Button
                    variant="cta"
                    onClick={() => reset()}
                >
                    {t("tryAgain")}
                </Button>
            </div>
        </section>
    );
}