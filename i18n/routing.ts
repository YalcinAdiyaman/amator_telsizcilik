import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // Desteklenen diller
    locales: ['tr', 'en'],

    // Varsayılan dil - Türkçe
    defaultLocale: 'tr',

    // URL'de varsayılan dil prefix'i gösterilsin mi?
    localePrefix: 'always'
});

// Navigation hook'ları - Link, redirect, usePathname, useRouter
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
