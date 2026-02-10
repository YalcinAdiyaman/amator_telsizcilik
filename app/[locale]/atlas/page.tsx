import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import AtlasClientWrapper from "@/components/Map/AtlasClientWrapper";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Atlas.Meta" });
    return {
        title: t("title"),
        description: t("description")
    };
}

export default function AtlasPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-[var(--bg-void)]">
            <Navbar />
            <div className="absolute inset-0 z-0">
                <AtlasClientWrapper />
            </div>

            {/* Overlay Elements */}


            <div className="absolute bottom-8 right-8 z-30 pointer-events-none">
                <div className="text-right">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-[var(--primary-500)] to-transparent tracking-tighter opacity-50">
                        ATLAS
                    </h1>
                    <p className="text-[10px] text-[var(--text-muted)] tracking-[0.5em]">
                        INTERACTIVE_MAP_V1.0
                    </p>
                </div>
            </div>
        </main>
    );
}
