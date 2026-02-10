"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamic import to prevent SSR issues with Leaflet
const LeafletMap = dynamic(() => import("./Map/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[var(--bg-void)] text-[var(--primary-500)]">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <span className="font-mono text-xs tracking-[0.2em] animate-pulse">
                LOADING_TERRAIN_DATA...
            </span>
        </div>
    ),
});

import { useTranslations } from "next-intl";

export default function AtlasMap() {
    const t = useTranslations("Atlas");

    // Dynamic import inside component to use hook
    const LeafletMap = dynamic(() => import("./Map/LeafletMap"), {
        ssr: false,
        loading: () => (
            <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[var(--bg-void)] text-[var(--primary-500)]">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <span className="font-mono text-xs tracking-[0.2em] animate-pulse">
                    {t('loading')}
                </span>
            </div>
        ),
    });

    return (
        <section className="relative w-full">
            <LeafletMap />
        </section>
    );
}
