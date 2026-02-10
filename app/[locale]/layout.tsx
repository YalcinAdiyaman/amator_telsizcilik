import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import AmbientOverlay from "@/components/AmbientOverlay";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as "tr" | "en")) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Provide all messages to the client
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <AmbientOverlay />
            {children}
        </NextIntlClientProvider>
    );
}
