import { ReactNode } from "react";

import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Scada, Roboto, Roboto_Condensed } from "next/font/google";

import { auth } from "@/shared/lib/auth";
import { HeaderWrapper } from "@/widgets";

import { Providers } from "../providers";
import { WithToast } from "./with-toast";

import "@/styles/globals.css";

type RootLayoutProps = {
    children: ReactNode;
    params: Promise<{
        locale: string;
    }>;
};

const roboto = Roboto({
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    variable: "--font-roboto",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

const robotoCondensed = Roboto_Condensed({
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    variable: "--font-robotoCondensed",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

const scada = Scada({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    variable: "--font-scada",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export default async function RootLayout({
    children,
    params,
}: RootLayoutProps) {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    const session = await auth();

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className="scroll-smooth"
        >
            <body
                suppressHydrationWarning
                className={`${roboto.variable} ${robotoCondensed.variable} ${scada.variable}`}
            >
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    <Providers session={session}>
                        <HeaderWrapper />
                        <WithToast>{children}</WithToast>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
