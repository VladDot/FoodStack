import { getTranslations } from "next-intl/server";

import { LoadingState } from "@/shared/ui/page-states";

export default async function Loading() {
    const t = await getTranslations("loadingState");

    return <LoadingState label={t("label")} />;
}