import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as 'tr' | 'en')) {
        locale = routing.defaultLocale;
    }

    try {
        return {
            locale,
            messages: (await import(`./messages/${locale}.json`)).default
        };
    } catch (error) {
        notFound();
    }
});
