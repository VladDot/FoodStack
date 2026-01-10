import { useTranslations } from "next-intl";

import { Banner } from "./banner";

export const HomePage = ({}) => {
    const t = useTranslations("");

    return (
        <div className="p-4 flex flex-col gap-4">
            <Banner />
            <p>{t("test")}</p>
        </div>
    );
};
