"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/button";

import { Banner } from "../../shared/ui/banner";

export const HomePage = ({}) => {
    const t = useTranslations("");
    return (
        <div className="p-4 flex flex-col gap-4">
            <Banner />
            <p>{t("test")}</p>

            <div className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-neutral-100 shadow-sm">
                <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wide">
                    Button Variants
                </h2>
                <div className="flex  gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="cta">CTA</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                </div>
                <div className="flex  gap-3">
                    <Button
                        variant="primary"
                        disabled
                    >
                        Primary disabled
                    </Button>
                    <Button
                        variant="cta"
                        disabled
                    >
                        CTA disabled
                    </Button>
                    <Button
                        variant="outline"
                        disabled
                    >
                        Outline disabled
                    </Button>
                    <Button
                        variant="danger"
                        disabled
                    >
                        Danger disabled
                    </Button>
                </div>
            </div>
        </div>
    );
};
