"use client";

import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { ReactNode } from "react";
import { WidthToast } from "./with-toast";

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    const locale = useLocale();
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={messages}
            locale={locale}
        >
            <WidthToast>{children}</WidthToast>
        </NextIntlClientProvider>
    );
}
