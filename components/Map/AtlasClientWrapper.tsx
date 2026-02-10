"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/Map/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-black text-[var(--primary-500)] font-mono animate-pulse">
            LOADING_ATLAS_DATA...
        </div>
    ),
});

export default function AtlasClientWrapper() {
    return <MapComponent />;
}
