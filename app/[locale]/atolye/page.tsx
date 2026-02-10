import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ToolsGrid from "@/components/ToolsGrid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Atolye" });
    return {
        title: `${t("title")} | TA Radio Portal`,
        description: t("description")
    };
}

export default async function AtolyePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Atolye" });

    return (
        <main className="min-h-screen bg-[var(--bg-void)] text-white pt-[60px] pb-20 relative overflow-hidden">
            <Navbar />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-radar-grid opacity-20 pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 mt-8">
                <header className="mb-12 border-b border-[var(--primary-500)]/30 pb-6">
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text-secondary)] tracking-tighter mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-sm font-mono text-[var(--primary-500)] tracking-[0.2em]">
                        {t('subtitle')} // TOOLS
                    </p>
                </header>

                <ToolsGrid />
            </div>
        </main>
    );
}

