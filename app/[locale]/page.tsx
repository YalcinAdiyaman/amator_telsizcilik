import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import ModulesSection from "@/components/ModulesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Meta" });
    return {
        title: t("title"),
        description: t("description")
    };
}

export default function Home({
    params: { locale }
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    return (
        <main className="min-h-screen bg-[var(--bg-void)] flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <Hero />
                <ModulesSection />
            </div>
            <Footer />
        </main>
    );
}
