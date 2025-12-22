import { useTranslations } from "next-intl";

export const HomePage = ({}) => {
    const t = useTranslations("");

    return <>{t("test")}</>;
};
