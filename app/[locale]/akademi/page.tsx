import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import AcademyDashboard from "@/components/Academy/AcademyDashboard";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Academy" });
    return {
        title: `${t("title")} | TA Radio Portal`,
        description: t("description")
    };
}

export default function AkademiPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    return (
        <AcademyDashboard />
    );
}
