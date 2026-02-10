import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default async function AcademyLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // We can add specific academy navigation or sidebars here later
    return (
        <main className="min-h-screen bg-[var(--bg-void)] text-white pt-[60px] pb-20 relative overflow-hidden">
            <Navbar />
            <div className="absolute inset-0 bg-radar-grid opacity-10 pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 mt-8">
                {children}
            </div>
        </main>
    );
}
