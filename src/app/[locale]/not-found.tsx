import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundState } from "@/shared/ui/page-states";

export default async function NotFound() {
    const t = await getTranslations("notFound");
    const locale = await getLocale();

    return (
        <NotFoundState
            title={t("title")}
            message={t("message")}
            backHref={`/${locale}`}
            backLabel={t("backHome")}
        />
    );
}