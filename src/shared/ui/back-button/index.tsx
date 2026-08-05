"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../button";

export const BackButton = () => {
    const router = useRouter();

    return (
        <Button
            variant="cta"
            leftIcon={<ArrowLeft className="size-4" />}
            className="max-w-[200px] mb-4"
            onClick={() => router.back()}
        >
            Back to search
        </Button>
    );
};
